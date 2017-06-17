import { Component, h } from "preact";

export default class Upload extends Component<any, null> {
  public uploadFile(e: Event) {
    e.preventDefault();
    console.log(this);
  }

  public render() {
    return (
      <div
        onClick={this.uploadFile.bind(this)}
        class="Upload"
        onDrag={this.uploadFile.bind(this)}
      >
        <input id="input" type="file" />
        <div class="Upload__text">
          <h4>添加题图</h4>
          <p>点击或者拖拽上传</p>
        </div>
      </div>
    );
  }
}
