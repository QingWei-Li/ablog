import * as kcors from "kcors";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as session from "koa-session";
import connectDB from "./lib/db";
import bindRoutes from "./lib/router";
import handleError from "./middlewares/error";

connectDB();

const app = new Koa();

app.keys = ["better call saul"];

app.use(bodyParser());
app.use(kcors());
app.use(logger());
app.use(
  session(
    {
      maxAge: 86400000,
      httpOnly: false
    },
    app
  )
);
app.use(handleError);

bindRoutes(app);

app.listen(5000, () => {
  console.log("\nListening at http://localhost:5000");
});
