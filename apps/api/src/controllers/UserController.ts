import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  QueryParam,
  Use
} from "trafficlight";
import { CurrentSession } from "../lib/decorates";
import Authorized from "../middlewares/authorized";
import { IUserModel, UserModel } from "../models/User";

@Controller("/user")
export default class UserController {
  @Get("/check/:name")
  public async check(@Param("name") name: string) {
    return { message: Boolean(await UserModel.findOne({ name })) };
  }

  @Post()
  public async create(
    @Body() body: IUserModel,
    @CurrentSession() session: any
  ): Promise<IUserModel> {
    const user = await UserModel.create(body);

    session.user = user._id;
    delete user.password;

    return user;
  }

  @Use(Authorized)
  @Put()
  public async update(
    @Body() body: IUserModel,
    @CurrentSession() session: any
  ): Promise<IUserModel> {
    return await UserModel.update(session.user, body);
  }

  @Use(Authorized)
  @Get("/current")
  public async getCurrent(@CurrentSession() session: any): Promise<IUserModel> {
    const user = await UserModel.findOne({ _id: session.user }).select(
      "-password"
    );

    return user;
  }

  @Get()
  public async getByName(@QueryParam("name") name: any): Promise<IUserModel> {
    const user = await UserModel.findOne({ name }).select("-password");

    return user;
  }
}
