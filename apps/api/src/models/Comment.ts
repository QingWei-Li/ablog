import { Document, model, Schema } from "mongoose";

export interface ICommentModel extends Document {
  rawContent: string;
  content: string;
  username: string;
  useremail: string;
  post: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    rawContent: { type: String, required: true },
    useremail: { type: String },
    username: { type: String },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
  },
  {
    timestamps: true
  }
);

export const CommentModel = model<ICommentModel>("Comment", CommentSchema);
