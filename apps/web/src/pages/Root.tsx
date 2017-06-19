import Avatar from "@/components/Avatar";
import { EditPlaceholder, LoginPlaceholder } from "@/components/Placeholder";
import "@/styles/PageRoot.styl";
import { http } from "@/utils";
import { Component, h } from "preact";
import * as AsyncRoute from "preact-async-route";
import Router from "preact-router";
import { Link } from "preact-router/match";
import * as store2 from "store2";

import Home from "./Home";
import List from "./List";
import Post from "./Post";

function getEdit() {
  return System.import("./Edit").then((m: any) => m.default);
}

function getLogin() {
  return System.import("./Login").then((m: any) => m.default);
}

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
    if (localUser) {
      this.setState({ user: localUser });
    }

    try {
      const user = (await http.get("/user/current")).data;
      this.setState({ user });
      store2.set("user", user);
    } catch (e) {
      this.setState({ user: undefined });
      store2.remove("user");
    }
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
            <Post path="/p/:id" />
            <AsyncRoute
              path="/login"
              component={getLogin}
              loading={() => <LoginPlaceholder />}
            />
            <AsyncRoute
              path="/edit"
              component={getEdit}
              loading={() => <EditPlaceholder />}
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
