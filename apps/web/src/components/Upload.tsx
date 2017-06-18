import "@/styles/Upload.styl";
import { http } from "@/utils";
import { Component, h } from "preact";
import * as Dropzone from "react-dropzone";

interface IUploadProps {
  id?: string;
  height?: string;
  width?: string;
  onChange: (...args) => void;
}

export default class Upload extends Component<IUploadProps, any> {
  public uploadFile = async file => {
    file = file[0];

    const data = new FormData();

    this.setState({ file });
    data.append("smfile", file);
    const result = await http.post("https://sm.ms/api/upload", data, {
      withCredentials: false
    });

    this.props.onChange(result.data.data.url);
  };

  public render({ id = "input", height, width, onChange }, { file }) {
    return (
      <Dropzone
        style={{
          backgroundImage: file ? `url(${file.preview})` : "",
          height,
          width
        }}
        accept="image/jpeg, image/png"
        class="Upload"
        multiple={false}
        onDrop={this.uploadFile}
      >
        {file ? "" : <div class="Upload__text">{this.props.children}</div>}
      </Dropzone>
    );
  }
}
