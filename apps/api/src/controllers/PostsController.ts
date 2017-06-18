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
import Authorized from "../middlewares/authorized";
import { IPostModel, PostModel } from "../models/post";
import { UserModel } from "../models/user";

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
      });
    }
    result = await PostModel.find({});

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
      // @TODO
      // 如何通过 comments 排序。。
      return await PostModel.find({}).limit(limit);
    } else if (type === "new") {
      return await PostModel.find({}).sort("-createAt").limit(limit);
    }

    throw Boom.badRequest("Only supports `new` or `hot` type");
  }

  @Use(Authorized)
  @Post()
  public async create(@Body() body: IPostModel): Promise<IPostModel> {
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
    return await PostModel.findById(id);
  }
}
