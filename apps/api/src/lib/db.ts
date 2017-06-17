import * as DB from "mongoose";

export default function connectDB() {
  require("mongoose").Promise = Promise;

  DB.connect(process.env.BLOG_MONGO_URI);
}
