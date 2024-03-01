import express from "express";
import mongoose from "mongoose";
import { todoSchema } from "../zod/zodSchema.js";
import { Todo } from "../db/db.js";
import { authMiddleware } from "../middlewares/auth.js";

export const todoRouter = express.Router();

todoRouter.use(authMiddleware);

todoRouter.get("/bulk", async (req, res) => {
  try {
    const todoList = await Todo.findOne({ userId: req.documentId });
    if (!todoList) {
      return res.json({
        msg: "No todo list found.",
      });
    }

    return res.json({
      todoList: todoList.todos,
    });
  } catch (err) {
    console.log(err);
  }
});

todoRouter.post("/add", async (req, res) => {
  try {
    const todo = req.body;
    const parsedTodo = todoSchema.safeParse(todo);
    if (!parsedTodo.success) {
      return res.json({
        msg: "You have entered in wrong format.",
      });
    }

    const createTodo = await Todo.findOneAndUpdate(
      { userId: req.documentId },
      { $push: { todos: todo } },
      { new: true }
    );
    if (!createTodo) {
      console.log(createTodo);
      return res.json({
        msg: "Couldnt add the new todo.",
      });
    }

    return res.json({
      msg: "New todo has been added.",
    });
  } catch (err) {
    console.log(err);
  }
});

todoRouter.put("/update", async (req, res) => {});

todoRouter.delete("/delete", async (req, res) => {});
