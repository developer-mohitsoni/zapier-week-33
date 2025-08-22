import express, { Application } from "express";
import { userRouter } from "./router/user.routes";
import { zapRouter } from "./router/zap.routes";

import "dotenv/config"

import cors from "cors"

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});