import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signinSchema, signupSchema } from "../zod/zodSchema.js";
import { User } from "../db/db.js";
import { JWT_SECRATE_KEY } from "../config/config.js";

export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signupSchema.safeParse(payload);
    if (!parsedPayload.success) {
      return res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    const user = await User.findOne({
      $or: [{ username: payload.username }, { email: payload.email }],
    });
    if (user) {
      return res.json({
        msg: "This user already exists.",
      });
    }

    const salt = await bcrypt.genSalt();
    payload.password = await bcrypt.hash(payload.password, salt);

    const accountCreate = await User.create(payload);
    if (!accountCreate) {
      return res.json({
        msg: "There was error in creating account.",
      });
    }

    const token = jwt.sign({ payload }, JWT_SECRATE_KEY);

    return res.json({
      msg: "Account has been created.",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.delete("/signup", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const userInfo = jwt.decode(token, JWT_SECRATE_KEY).user;

  const deleteAccount = await User.deleteOne(userInfo);
  if (!deleteAccount.acknowledged || !deleteAccount.deletedCount) {
    return res.json({
      msg: "Failed to delete account.",
    });
  }

  return res.json({
    msg: "Account deleted sucessfully.",
  });
});

userRouter.get("/signin", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signinSchema.safeParse(payload);
    if (!parsedPayload.success) {
      return res.json({
        msg: "You have entered wrong inputs.",
      });
    }

    const user = await User.findOne({ username: payload.username });
    if (!user) {
      return res.json({
        msg: "There is no account with the entered username.",
      });
    }

    const result = await bcrypt.compare(payload.password, user.password);
    if (!result) {
      return res.json({
        msg: "You have entered wrong password.",
      });
    }

    const token = jwt.sign({ user }, JWT_SECRATE_KEY);

    return res.json({
      msg: "You have logged in to the account.",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});
