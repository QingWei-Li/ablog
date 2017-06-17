import { Controller, Get } from "trafficlight";

@Controller("/ping")
export default class PostsController {
  @Get()
  public async get() {
    return { message: "ping" };
  }
}
