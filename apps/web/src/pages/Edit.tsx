import Upload from "@/components/Upload";
import "@/styles/PageEdit.styl";
import { http } from "@/utils";
import * as hljs from "highlight.js";
// 注意引入的顺序
// tslint:disable-next-line:ordered-imports
import "inline-attachment/src/inline-attachment";
import "inline-attachment/src/codemirror-4.inline-attachment";
import { Component, h } from "preact";
import { route } from "preact-router";
import * as SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import * as striptags from "striptags";

const inlineAttachment = window["inlineAttachment"];
window["hljs"] = hljs;

export default class Edit extends Component<any, any> {
  public constructor(props, context) {
    super(props, context);
    this.state = {
      formData: {},
      simplemde: null
    };
  }

  public async componentDidMount() {
    this.initEditor(this.state.eidtor);

    const { id } = this.props;

    if (!id) {
      return;
    }

    try {
      const formData = (await http.get(`/posts/${id}/edit`)).data;
      this.setState({ formData });
      this.state.simplemde.value(formData.rawContent);
    } catch (e) {
      location.href = "/";
    }
  }

  public initEditor(node: Element) {
    const simplemde = new SimpleMDE({
      element: node,
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

    this.setState({ simplemde });
    this.handleEditorChange();
    simplemde.codemirror.on("change", () => this.handleEditorChange());
  }

  public handleEditorChange() {
    const rawContent = this.state.simplemde.value();
    const content = this.state.simplemde.options.previewRender(rawContent);

    const state = {
      formData: {
        ...this.state.formData,
        rawContent,
        content,
        summary: striptags(content.slice(0, 300)).slice(0, 100)
      }
    };

    this.setState(state);
  }

  public submitPost = async (e: Event) => {
    e.preventDefault();
    const id = this.props.id;
    const formData = this.state.formData;

    const result = id
      ? await http.patch(`/posts/${id}`, formData)
      : await http.post("/posts", formData);

    this.state.simplemde.toTextArea();
    this.state.simplemde.clearAutosavedValue();

    route(`/p/${id || result.data._id}`);
  };

  public render() {
    return (
      <form class="Edit" onSubmit={this.submitPost}>
        <Upload
          value={this.state.formData.picture}
          onChange={this.linkState("formData.picture")}
        >
          <h4>添加题图</h4>
          <p>点击或者拖拽上传</p>
        </Upload>
        <input
          required={true}
          onInput={this.linkState("formData.title")}
          class="Edit__title"
          type="text"
          value={this.state.formData.title}
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
