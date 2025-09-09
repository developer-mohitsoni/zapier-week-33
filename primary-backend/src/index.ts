import express, { Application } from "express";
import { userRouter } from "./router/user.routes";
import { zapRouter } from "./router/zap.routes";

import "dotenv/config"

import cors from "cors"
import { triggerRouter } from "./router/tgger";
import { actionRouter } from "./router/action";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}))

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});