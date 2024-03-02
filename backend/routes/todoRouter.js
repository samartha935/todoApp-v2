import express from "express";
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
      _id: todoList._id,
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

todoRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  const deleteTodo = await Todo.findOneAndUpdate(
    { _id: body.todoDocumentId },
    {
      $pull: {
        todos: {
          _id: body.todoId,
        },
      },
    }
  );

  if (!deleteTodo) {
    return res.json({
      msg: "There was an error while deleting todo. Try again.",
    });
  }

  return res.json({
    msg: "Todo successfully deleted.",
  });
});
