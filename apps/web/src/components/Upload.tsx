import "@/styles/Upload.styl";
import { Component, h } from "preact";

interface IUploadProps {
  id?: string;
  height?: string;
  width?: string;
  onChange: (...args) => void;
}

export default class Upload extends Component<IUploadProps, null> {
  public uploadFile = (e: Event) => {
    e.preventDefault();
    console.log(this);
    this.props.onChange();
  };

  public render({ id = "input", height, width, onChange }) {
    return (
      <div
        onClick={this.uploadFile}
        class="Upload"
        style={{ height, width }}
        onDrag={this.uploadFile}
      >
        <input id={id} type="file" />
        <div class="Upload__text">
          {this.props.children}
        </div>
      </div>
    );
  }
}
