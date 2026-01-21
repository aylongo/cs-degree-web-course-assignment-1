import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  getCommentsByPost,
} from "../controllers/postController";

export const createPostsRouter = () => {
  const router = Router();

  router.post("/", createPost);
  router.get("/", getAllPosts);
  router.get("/:id", getPostById);
  router.put("/:id", updatePost);
  router.get("/:id/comments", getCommentsByPost);

  return router;
};
