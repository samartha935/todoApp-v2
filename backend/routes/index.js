import express from "express";
import { userRouter } from "./userRouter";

export const indexRouter = express.Router();

indexRouter.use("/user", userRouter);

// indexRouter.use("/todo", todoRouter);
