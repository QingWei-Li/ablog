import * as Boom from "boom";
import { Body, Controller, Get, Post, Use } from "trafficlight";
import { CurrentSession } from "../lib/decorates";
import Authorized from "../middlewares/authorized";
import { IUserModel, UserModel } from "../models/user";

@Controller()
export default class AuthController {
  @Post("/signin")
  public async signin(
    @Body() body: any,
    @CurrentSession() session: any
  ): Promise<IUserModel> {
    const { email, name, password } = body;
    const query = { email, name, password };

    if (!(email || name) || !password) {
      throw Boom.badRequest("Password and email(or name) is required");
    }
    if (!name) {
      delete query.name;
    }
    if (!email) {
      delete query.email;
    }

    const user = await UserModel.findOne(query).select("-password");

    if (!user) {
      throw Boom.badRequest("Incorrect username or password");
    }

    session.user = user._id;

    return user;
  }

  @Use(Authorized)
  @Get("/signout")
  public signup(@CurrentSession() session: any): void {
    session.user = null;

    return;
  }
}
