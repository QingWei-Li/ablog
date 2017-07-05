import { Document, model, Schema } from "mongoose";
import { IUserModel } from "./User";

export interface IPostModel extends Document {
  title: string;
  author: IUserModel;
  picture: string;
  rawContent: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  pv?: number;
  comments: number;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    rawContent: { type: String, required: true },
    summary: { type: String, required: true },
    picture: { type: String },
    pv: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export const PostModel = model<IPostModel>("Post", PostSchema);
