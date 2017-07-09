import { Document, model, Schema } from "mongoose";

export interface IUserModel extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String }
  },
  {
    timestamps: true
  }
);

export const UserModel = model<IUserModel>("User", UserSchema);
