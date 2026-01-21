import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models/post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, sender } = req.body;
    const post = await Post.create({ title, content, sender });
    res.status(StatusCodes.CREATED).json(post);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { sender } = req.query;
    const filter = sender ? { sender } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Post not found" });
    res.json(post);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, sender } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, sender },
      { new: true },
    );
    if (!updated)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Post not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { Comment } = await import("../models/comment");
    const comments = await Comment.find({ post: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
