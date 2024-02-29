import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signupSchema } from "../zod/zodSchema";
import { User } from "../db/db";
import { JWT_SECRATE_KEY } from "../config/config";

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

    const user = await User.find({ payload });

    if (user) {
      return res.json({
        msg: "This user already exists.",
      });
    }

    const salt = await bcrypt.genSalt();
    payload.password = await bcrypt.hash(payload.password, salt);

    const accountCreate = await User.create({ payload });

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
