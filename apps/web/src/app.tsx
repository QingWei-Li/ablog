import "@/styles/static.styl";
import { h, render } from "preact";

let root;
function init() {
  const App = require("./pages/Root").default;

  root = render(<App />, document.getElementById("app"), root);
}

if (module.hot) {
  module.hot.accept("./pages/Root", () => requestAnimationFrame(init));
}

init();
