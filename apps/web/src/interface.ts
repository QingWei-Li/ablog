interface IComment {
  _id: string;
  rawContent: string;
  content: string;
  username?: string;
  useremail?: string;
  post: IPost;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  _id: string;
  title: string;
  author: IUser;
  picture: string;
  rawContent: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  pv?: number;
  comments: number;
}
