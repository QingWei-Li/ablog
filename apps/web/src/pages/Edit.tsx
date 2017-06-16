import * as hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Component, h } from "preact";
import * as SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

window["hljs"] = hljs;

export default class Edit extends Component<any, null> {
  public async componentDidMount() {
    const simplemde = new SimpleMDE({
      element: this.base.querySelector("#edit"),
      spellChecker: false,
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });
  }

  public render() {
    return (
      <div>
        <textarea id="edit" />
      </div>
    );
  }
}
