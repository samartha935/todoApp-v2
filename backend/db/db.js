import mongoose from "mongoose";
import { DATABASE_URL } from "../config/config.js";

mongoose.connect(DATABASE_URL);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      title: String,
      description: String,
      taskCompleted: Boolean,
    },
  ],
});

export const User = mongoose.model("user", userSchema);
export const Todo = mongoose.model("todo", todoSchema);
