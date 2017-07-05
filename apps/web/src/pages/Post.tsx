import Comment from "@/components/Comment";
import { IPost } from "@/interface";
import "@/styles/PagePost.styl";
import { http, randomImage } from "@/utils";
import { Component, h } from "preact";
import TimeAgo from "timeago-react";
import * as zoomImage from "zoom-image";

export default class Post extends Component<any, any> {
  public state = { imgs: [], post: { author: {} }, loading: true };

  public async componentWillMount() {
    const result = await http.get(`/posts/${this.props.id}`);
    this.setState({
      post: result.data,
      loading: false
    });

    await http.get(`/posts/${this.props.id}/pv`);
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

  public render({ user }, { post, loading }) {
    return (
      <div class="Post">
        {!loading &&
          <img
            class="Post__picture"
            src={post.picture || randomImage(350, 370)}
            alt={post.title}
          />}
        <h1 class="Post__title">
          {post.title}
        </h1>
        <div class="Post__info">
          <span>
            {post.author.name}
          </span>
          <TimeAgo datetime={post.createdAt || new Date()} locale="zh_CN" />
          <a href={`/edit/${post._id}`}>编辑</a>
        </div>
        <article
          class="Post__article"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {!loading && <Comment postId={post._id} user={user} />}
      </div>
    );
  }
}
