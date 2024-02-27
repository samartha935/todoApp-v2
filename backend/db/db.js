import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://samarthudupa5:PgV5cFFTGt4M3ssH@cluster0.qiavfvk.mongodb.net/TodoApp"
);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  taskCompleted: Boolean,
});

export const User = mongoose.model("user", userSchema);
export const Todo = mongoose.model("todo", todoSchema);
