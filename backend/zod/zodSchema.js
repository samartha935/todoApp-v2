import zod from "zod";

export const signupSchema = zod.object({
  username: zod.string().min(4).max(10),
  email: zod.string().email(),
  password: zod.string().min(8),
}).strict()

export const signinSchema = zod.object({
  username: zod.string().min(4).max(10),
  password: zod.string().min(8),
}).strict()

export const todoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  taskCompleted: zod.boolean(),
}).strict()
