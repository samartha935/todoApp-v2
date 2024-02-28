import express from "express";
import cors from "cors";
import { PORT } from "./config/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("Server started..........");
});
