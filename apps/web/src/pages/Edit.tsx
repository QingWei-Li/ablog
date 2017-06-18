import Upload from "@/components/Upload";
import "@/styles/PageEdit.styl";
import "font-awesome/css/font-awesome.css";
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
  public constructor(props, context) {
    super(props, context);
    this.state = {
      formData: {}
    };
  }

  public componentDidMount() {
    this.initEditor(this.state.eidtor);
  }

  public initEditor(node: Element) {
    const simplemde = new SimpleMDE({
      element: node,
      autoDownloadFontAwesome: false,
      spellChecker: false,
      renderingConfig: {
        codeSyntaxHighlighting: true
      },
      autosave: {
        enabled: true,
        uniqueId: "post_new",
        delay: 1000
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

    simplemde.codemirror.on("change", () => {
      const rawContent = simplemde.value();
      const content = simplemde.options.previewRender(rawContent);

      const state = {
        formData: {
          rawContent,
          content,
          summary: content.slice(0, 100)
        }
      };
      this.setState(state);
    });
  }

  public render() {
    return (
      <form class="Edit">
        <Upload onChange={this.linkState("formData.picture")}>
          <h4>添加题图</h4>
          <p>点击或者拖拽上传</p>
        </Upload>
        <input
          required={true}
          onChange={this.linkState("formData.title")}
          class="Edit__title"
          type="text"
          placeholder="添加标题"
        />
        <div>
          <textarea ref={editor => this.setState({ editor })} />
        </div>
        <div class="Edit__submit">
          <input type="submit" value="发布" />
        </div>
      </form>
    );
  }
}
