import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signinSchema, signupSchema } from "../zod/zodSchema.js";
import { Todo, User } from "../db/db.js";
import { JWT_SECRET_KEY } from "../config/config.js";
import { authMiddleware } from "../middlewares/auth.js";

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
    const todoDocumentCreate = await Todo.create({
      userId: accountCreate._id,
      todos: [],
    });
    if (!(accountCreate && todoDocumentCreate)) {
      return res.json({
        msg: "There was error in creating account.",
      });
    }

    const token = jwt.sign(
      {
        username: accountCreate.username,
        email: accountCreate.email,
        documentId: accountCreate._id,
      },
      JWT_SECRET_KEY
    );

    return res.json({
      msg: "Account has been created.",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/signin", async (req, res) => {
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

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        documentId: user._id,
      },
      JWT_SECRET_KEY
    );

    return res.json({
      msg: "You have logged in to the account.",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.delete("/signup", authMiddleware, async (req, res) => {
  try {
    const deleteAccount = await User.deleteOne({
      username: req.username,
    });
    const deleteTodoList = await Todo.deleteOne({
      userId: req.documentId,
    });
    if (
      (!deleteAccount.acknowledged || !deleteAccount.deletedCount) &&
      (!deleteTodoList.acknowledged || !deleteTodoList.deletedCount)
    ) {
      return res.json({
        msg: "Failed to delete account.",
      });
    }

    return res.json({
      msg: "Account deleted sucessfully.",
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/info", authMiddleware, async (req, res) => {
  try {
    const userInfo = await User.findOne({ _id: req.documentId });
    if (!userInfo) {
      return res.json({
        msg: "User info could not be found.",
      });
    }
    return res.json({
      userInfo,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  try {
    const info = req.body;
    const parsedInfo = signupSchema.safeParse(info);
    if (!parsedInfo.success) {
      return res.json({
        msg: "You have entered wrong inputs.",
      });
    }

    const salt = await bcrypt.genSalt();
    info.password = await bcrypt.hash(info.password, salt);

    const update = await User.findOneAndUpdate(
      { _id: req.documentId },
      {
        $set: info,
      },
      { new: true }
    );

    if (!update) {
      return res.json({
        msg: "Couldnt find your account and update your information.",
      });
    }

    return res.json({
      msg: "Your information has been updated",
      newInfo: update,
    });
  } catch (err) {
    console.log(err);
  }
});
