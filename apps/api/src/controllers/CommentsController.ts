import * as Boom from "boom";
import { Controller, Get, QueryParam } from "trafficlight";
import { CommentModel, ICommentModel } from "../models/Comment";

@Controller("/comments")
export default class CommentsController {
  @Get()
  public async get(@QueryParam() query: any): Promise<ICommentModel[]> {
    return await CommentModel.find(query);
  }
}
