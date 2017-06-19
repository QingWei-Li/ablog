import { IPost } from "@/interface";
import { http } from "@/utils";
import { Component, h } from "preact";
import * as zoomImage from "zoom-image";

export default class Post extends Component<any, any> {
  public state = { post: {} };

  public async componentWillMount() {
    const result = await http.get(`/posts/${this.props.id}`);
    this.setState({
      post: result.data
    });
  }

  public render({}, { post }) {
    return (
      <div class="Post">
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  }
}
