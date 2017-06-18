import Upload from "@/components/Upload";
import * as hljs from "highlight.js";
import "highlight.js/styles/github.css";
// tslint:disable-next-line:ordered-imports
import "inline-attachment/src/inline-attachment";
import "inline-attachment/src/codemirror-4.inline-attachment";
import { Component, h } from "preact";
import * as SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

const inlineAttachment = window["inlineAttachment"];
window["hljs"] = hljs;

export default class Edit extends Component<any, any> {
  public componentDidMount() {
    this.initEditor(this.state.eidtor);
  }

  public initEditor(node: Element) {
    const simplemde = new SimpleMDE({
      element: node,
      spellChecker: false,
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });

    inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, {
      uploadUrl: "https://sm.ms/api/upload",
      uploadFieldName: "smfile",
      onFileUploadResponse(xhr) {
        const result = JSON.parse(xhr.responseText);
        const filename = result.data.url;

        if (result && filename) {
          let newValue;
          if (typeof this.settings.urlText === "function") {
            newValue = this.settings.urlText.call(this, filename, result);
          } else {
            newValue = this.settings.urlText.replace(
              this.filenameTag,
              filename
            );
          }

          const text = this.editor.getValue().replace(this.lastValue, newValue);
          this.editor.setValue(text);
          this.settings.onFileUploaded.call(this, filename);
        }

        return false;
      }
    });
  }

  public render() {
    return (
      <div>
        <Upload onChange={this.linkState("picture")} />
        <textarea placeholder="添加标题" />
        <textarea ref={editor => this.setState({ editor })} />
      </div>
    );
  }
}
