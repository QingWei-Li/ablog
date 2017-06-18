import { Document, model, Schema } from "mongoose";
import { ICommentModel } from "./comment";
import { IUserModel } from "./user";

export interface IPostModel extends Document {
  title: string;
  author: IUserModel;
  picture: string;
  rawContent: string;
  content: string;
  summary: string;
  comments: ICommentModel[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
    content: { type: String, required: true },
    rawContent: { type: String, required: true },
    summary: { type: String, required: true },
    picture: { type: String }
  },
  {
    timestamps: true
  }
);

export const PostModel = model<IPostModel>("Post", PostSchema);
