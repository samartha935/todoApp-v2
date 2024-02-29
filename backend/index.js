import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { indexRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", indexRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});
