import { IPost } from "@/interface";
import "@/styles/PagePost.styl";
import { http } from "@/utils";
import { Component, h } from "preact";
import TimeAgo from "timeago-react";
import * as zoomImage from "zoom-image";

export default class Post extends Component<any, any> {
  public state = { imgs: [], post: { author: {} } };

  public async componentWillMount() {
    const result = await http.get(`/posts/${this.props.id}`);
    this.setState({
      post: result.data
    });
  }

  public componentDidUpdate() {
    this.state.imgs.forEach(n => n());
    this.state.imgs = [].slice
      .call(this.base.querySelectorAll("article img"))
      .map(zoomImage);
  }

  public componentDidUnMount() {
    this.state.imgs.forEach(n => n());
  }

  public render({}, { post }) {
    return (
      <div class="Post">
        <h1>{post.title}</h1>
        <div>
          <span>{post.author.name}</span>
          <TimeAgo datetime={post.createdAt || new Date()} locale="zh_CN" />
        </div>
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  }
}
