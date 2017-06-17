import { Body, Controller, Get, Param, Post, Put, Use } from "trafficlight";
import { CurrentSession } from "../lib/decorates";
import Authorized from "../middlewares/authorized";
import { IUserModel, UserModel } from "../models/user";

@Controller("/user")
export default class UserController {
  @Get("/check/:name")
  public async check(@Param("name") name: string) {
    return { message: Boolean(await UserModel.findOne({ name })) };
  }

  @Post()
  public async create(@Body() body: IUserModel): Promise<IUserModel> {
    return await UserModel.create(body);
  }

  @Use(Authorized)
  @Put()
  public async update(
    @Body() body: IUserModel,
    @CurrentSession() session: any
  ): Promise<IUserModel> {
    return await UserModel.update(session.user, body);
  }
}
