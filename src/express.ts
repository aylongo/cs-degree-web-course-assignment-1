import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createCommentsRouter } from "./routes/comments";
import { createPostsRouter } from "./routes/posts";

export const initExpress = () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  app.use("/post", createPostsRouter());
  app.use("/comment", createCommentsRouter());

  return app;
};
