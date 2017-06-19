import { Document, model, Schema } from "mongoose";
import { IPostModel, PostModel } from "./Post";

export interface ICommentModel extends Document {
  rawContent: string;
  content: string;
  username?: string;
  useremail?: string;
  post: IPostModel;
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

CommentSchema.pre("save", function(next) {
  PostModel.update(
    { id: this._id },
    {
      $inc: {
        comments: 1
      }
    },
    next
  );
});

CommentSchema.pre("delete", function(next) {
  PostModel.update(
    { id: this._id },
    {
      $inc: {
        comments: -1
      }
    },
    next
  );
});

export const CommentModel = model<ICommentModel>("Comment", CommentSchema);
