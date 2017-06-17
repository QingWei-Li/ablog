import { Component, h } from "preact";
import * as AsyncRoute from "preact-async-route";
import Router from "preact-router";
import { Link } from "preact-router/match";

import Home from "./Home";
import List from "./List";

function Edit() {
  return System.import("./Edit.tsx").then((m: any) => m.default);
}

const Placeholder = () =>
  <div>
    <div class="Placeholder">
      <div class="Placeholder__img" />
    </div>
    {Array(4).fill("").map((o, index) =>
      <div class="Placeholder">
        {Array(3 - index)
          .fill("")
          .map(() => <div class="Placeholder__inline" />)}
        <div
          class={
            "Placeholder__inline " +
            (index < 3 ? "Placeholder__inline--leftover" : "")
          }
        />
      </div>
    )}
  </div>;

class Root extends Component<{}, null> {
  public render() {
    return (
      <div>
        <nav class="Nav">
          <div class="container">
            <Link href="/">纸糊</Link>
            <Link href="/" class="float-right">登录／注册</Link>
          </div>
        </nav>
        <main class="container">
          <Router>
            <Home path="/" />
            <List path="/u/:user" />
            <List path="/posts" />
            <AsyncRoute
              path="/edit"
              component={Edit}
              loading={() => <Placeholder />}
            />
          </Router>
          <footer class="Footer">
            ❤ <a href="//github.com/QingWei-Li/ablog">GitHub</a>
          </footer>
        </main>
      </div>
    );
  }
}
export default Root;
