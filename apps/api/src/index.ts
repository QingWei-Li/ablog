import * as kcors from "kcors";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import connectDB from "./lib/db";
import bindRoutes from "./lib/router";
import handleError from "./middlewares/error";

connectDB();

const app = new Koa();

app.use(bodyParser()).use(kcors()).use(logger()).use(handleError);

bindRoutes(app);

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
