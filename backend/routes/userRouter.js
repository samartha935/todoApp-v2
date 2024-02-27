import express from "express";
import { signupSchema } from "../zod/zodSchema";

export const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signupSchema.safeParse(payload)

    if(!parsedPayload.success){
        return res.status(411).json({
            msg : "You have entered wrong inputs."
        })
    }

    


  } catch (err) {
    console.log(err);
  }
});
