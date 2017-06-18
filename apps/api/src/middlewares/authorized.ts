import * as Boom from "boom";
import { Context } from "koa";

export default async function Authorized(ctx: any, next) {
  console.log(ctx.session);
  if (ctx.session.user) {
    return await next();
  }

  throw Boom.unauthorized();
}
