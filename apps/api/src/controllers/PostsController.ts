import * as Boom from "boom";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  QueryParam,
  Route,
  Use
} from "trafficlight";
import { CurrentSession } from "../lib/decorates";
import Authorized from "../middlewares/authorized";
import { CommentModel, ICommentModel } from "../models/Comment";
import { IPostModel, PostModel } from "../models/Post";
import { UserModel } from "../models/User";

const LIST_SELECT = "summary picture createdAt title author comments";

@Controller("/posts")
export default class PostsController {
  /**
   * Get all posts
   */
  @Get()
  public async get(
    @QueryParam("author") author?: string
  ): Promise<{ count: number; data: IPostModel[] }> {
    let result;

    if (author) {
      const user = await UserModel.findOne({
        name: author
      });

      result = await PostModel.find({
        author: user._id
      })
        .select(LIST_SELECT)
        .populate("author");
    }
    result = await PostModel.find().select(LIST_SELECT).populate("author");

    return {
      count: result.length,
      data: result
    };
  }

  @Get("/type/:type")
  public async getByType(
    @Param("type") type: string,
    @QueryParam("limit") limit: number = 4
  ): Promise<IPostModel[]> {
    limit = Number(limit);

    if (type === "hot") {
      return await PostModel.find()
        .limit(limit)
        .sort("-comments -pv")
        .select(LIST_SELECT)
        .populate("author");
    } else if (type === "new") {
      return await PostModel.find()
        .sort("-createAt")
        .select(LIST_SELECT)
        .populate("author")
        .limit(limit);
    }

    throw Boom.badRequest("Only supports `new` or `hot` type");
  }

  @Use(Authorized)
  @Post()
  public async create(
    @CurrentSession() session: any,
    @Body() body: IPostModel
  ): Promise<IPostModel> {
    body.author = session.user;

    return await PostModel.create(body);
  }

  @Use(Authorized)
  @Route("patch", "/:id")
  public async update(
    @Param("id") id: string,
    @Body() body: IPostModel
  ): Promise<IPostModel> {
    return await PostModel.update({ _id: id }, body);
  }

  @Get("/:id")
  public async getById(@Param("id") id: string): Promise<IPostModel> {
    return await PostModel.findById(id)
      .populate("author", "name email avatar")
      .select("-rawContent");
  }

  @Use(Authorized)
  @Get("/:id/edit")
  public async eitById(
    @Param("id") id: string,
    @CurrentSession() session: any
  ): Promise<IPostModel> {
    const data = await PostModel.findById(id).populate("author");

    if (!data || String(data.author._id) !== String(session.user)) {
      throw Boom.unauthorized();
    }

    return data;
  }

  @Get("/:id/pv")
  public async inPv(@Param("id") id: string) {
    return await PostModel.update(
      { _id: id },
      {
        $inc: {
          pv: 1
        }
      }
    );
  }

  @Get("/:post/comments")
  public async getComments(
    @Param("post") post: string
  ): Promise<ICommentModel[]> {
    return await CommentModel.find({ post }).sort("-createdAt");
  }

  @Post("/:post/comments")
  public async postComment(
    @Param("post") post: string,
    @Body() body,
    @CurrentSession() session: any
  ): Promise<ICommentModel> {
    if (!body.username || !body.useremail) {
      const user = await UserModel.findOne({ _id: session.user });
      body.username = user.name;
      body.useremail = user.email;
      body.useravatar = user.avatar;
    }

    const model = {
      rawContent: body.content,
      content: body.content,
      username: body.username,
      useremail: body.useremail,
      useravatar: body.useravatar,
      post
    };

    return await CommentModel.create(model);
  }
}
