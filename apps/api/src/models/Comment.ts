import { Document, model, Schema } from "mongoose";
import { IPostModel } from "./Post";

export interface ICommentModel extends Document {
  rawContent: string;
  content: string;
  username?: string;
  useremail?: string;
  post: IPostModel;
  createdAt?: Date;
  updatedAt?: Date;
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
  this.model("Post").update(
    { _id: this.post },
    {
      $inc: {
        comments: 1
      }
    },
    next
  );
});

CommentSchema.pre("delete", function(next) {
  this.model("Post").update(
    { _id: this.post },
    {
      $inc: {
        comments: -1
      }
    },
    next
  );
});

export const CommentModel = model<ICommentModel>("Comment", CommentSchema);
