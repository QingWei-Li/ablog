import * as Boom from "boom";
import * as Router from "koa-router";
import { bindRoutes } from "trafficlight";

import PingController from "../controllers/PingController";
import PostsController from "../controllers/PostsController";

export default function(app) {
  const routerRoutes = new Router({
    prefix: "/v1"
  });

  bindRoutes(routerRoutes, [PostsController, PingController]);
  app.use(routerRoutes.routes());
  app.use(routerRoutes.allowedMethods());
}
