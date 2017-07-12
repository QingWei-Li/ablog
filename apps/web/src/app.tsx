import "@/styles/_static.styl";
import "linkstate/polyfill";
import { h, render } from "preact";

if (process.env.NODE_ENV === 'production' && location.protocol === 'http:') {
  location.href = location.href.replace(/^http:/, 'https:')
}

let root;
function init() {
  const App = require("./pages/Root").default;

  root = render(<App />, document.getElementById("app"), root);
}

if (module.hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/devtools");
  module.hot.accept("./pages/Root", () => requestAnimationFrame(init));
}

init();
