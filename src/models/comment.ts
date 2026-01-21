import mongoose, { Document, Schema } from "mongoose";
import { IPost } from "./post";

export interface IComment extends Document {
  post: IPost | mongoose.Types.ObjectId;
  content: string;
  sender: string;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
