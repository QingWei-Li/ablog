import * as Boom from "boom";
import * as Router from "koa-router";
import { bindRoutes } from "trafficlight";

import AuthController from "../controllers/AuthController";
import CommentsController from "../controllers/CommentsController";
import PingController from "../controllers/PingController";
import PostsController from "../controllers/PostsController";
import UserController from "../controllers/UserController";

export default function(app) {
  const routerRoutes = new Router({
    prefix: "/v1"
  });

  bindRoutes(routerRoutes, [
    PostsController,
    PingController,
    UserController,
    AuthController,
    CommentsController
  ]);
  app.use(routerRoutes.routes());
  app.use(routerRoutes.allowedMethods());
}
