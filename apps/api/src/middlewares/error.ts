import * as Boom from "boom";
import { Context } from "koa";

export default async function(ctx: Context, next) {
  try {
    await next();
  } catch (err) {
    if (err.isBoom) {
      ctx.status = err.output.statusCode;
      ctx.body = err.output.payload;
    } else {
      ctx.status = ctx.status || 500;
      ctx.body = {
        statusCode: ctx.status,
        message: err.message,
        error: err.name
      };
    }
  }
}
