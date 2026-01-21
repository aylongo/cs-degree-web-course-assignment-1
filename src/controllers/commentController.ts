import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Comment } from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { post, content, sender } = req.body;
    const comment = await Comment.create({ post, content, sender });
    res.status(StatusCodes.CREATED).json(comment);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { post } = req.query as { post?: string };
    const filter = post ? { post } : {};
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });
    res.json(comment);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content, sender } = req.body;
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { content, sender },
      { new: true },
    );
    if (!updated)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const removed = await Comment.findByIdAndDelete(req.params.id);
    if (!removed)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });
    res.json({ success: true });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
