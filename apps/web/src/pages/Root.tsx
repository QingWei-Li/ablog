import { Component, h } from "preact";
import * as AsyncRoute from "preact-async-route";
import Router from "preact-router";
import { Link } from "preact-router/match";

import Home from "./Home";
import List from "./List";

function Edit() {
  return System.import("./Edit.tsx").then((m: any) => m.default);
}

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
            <AsyncRoute path="/edit" component={Edit} />
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
