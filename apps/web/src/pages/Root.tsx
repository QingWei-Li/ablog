import { Component, h } from "preact";
import Router from "preact-router";

import Home from "./Home";
// import List from "./List";

class Root extends Component<{}, null> {
  public render() {
    return (
      <main className="container">
        <Router>
          <Home path="/" />
          {/*<List path="/u/:user" />*/}
        </Router>
      </main>
    );
  }
}
export default Root;
