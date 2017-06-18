import Avatar from "@/components/Avatar";
import "@/styles/PageRoot.styl";
import { http } from "@/utils";
import { Component, h } from "preact";
import * as AsyncRoute from "preact-async-route";
import Router from "preact-router";
import { Link } from "preact-router/match";
import * as store2 from "store2";

import Home from "./Home";
import List from "./List";
import Login from "./Login";

function getEdit() {
  return System.import("./Edit").then((m: any) => m.default);
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

const NavTool = ({ user }) =>
  <div class="float-right Nav__tool">
    <Link
      href="/edit"
      class="button button-outline button-small Nav__tool__item"
    >
      写文章
    </Link>
    <Avatar {...user} class="Nav__tool__item" />
    <Link class="Nav__tool__item" href={`/u/${user.name}`}>{user.name}</Link>
  </div>;

class Root extends Component<{}, any> {
  public async getCurrentUser() {
    const localUser = store2.get("user");
    this.setState({ user: localUser });

    const user = (await http.get("/user/current")).data;
    this.setState({ user });
    store2.set("user", user);
  }

  public componentWillMount() {
    this.getCurrentUser();
  }

  public render({}, { user }) {
    return (
      <div>
        <nav class="Nav">
          <div class="container">
            <Link href="/">纸糊</Link>
            {user
              ? <NavTool user={user} />
              : <Link href="/login" class="float-right">登录 / 注册</Link>}
          </div>
        </nav>
        <main class="container">
          <Router>
            <Home path="/" user={user} />
            <List path="/u/:name" user={user} />
            <List path="/posts" />
            <Login path="/login" />
            <AsyncRoute
              path="/edit"
              component={getEdit}
              loading={() => <Placeholder />}
            />
          </Router>
          <footer class="Footer">
            &hearts; <a href="//github.com/QingWei-Li/ablog">GitHub</a>
          </footer>
        </main>
      </div>
    );
  }
}
export default Root;
