import { Controller, Get } from "trafficlight";

@Controller("/ping")
export default class PingController {
  @Get()
  public async get() {
    return { message: "ping" };
  }
}
