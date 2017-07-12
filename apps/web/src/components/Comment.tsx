import Avatar from "@/components/Avatar";
import { IUser } from "@/interface";
import "@/styles/Comment.styl";
import { http } from "@/utils";
import { Component, h } from "preact";
import TimeAgo from "timeago-react";

class CommentBox extends Component<
  { user: IUser; postId: string; onSubmit: () => void },
  any
> {
  public constructor(props, context) {
    super(props, context);
    this.state = {
      formData: {}
    };
  }

  public submitComment = async (e: Event) => {
    e.preventDefault();
    await http.post(
      `/posts/${this.props.postId}/comments`,
      this.state.formData
    );
    this.props.onSubmit();
    this.setState({ formData: {} });
  };

  public render({ user }) {
    return (
      <form onSubmit={this.submitComment} class="Comment__box">
        <textarea
          value={this.state.formData.content}
          onInput={this.linkState("formData.content")}
          cols={30}
          rows={10}
          maxLength={1000}
        />
        {user
          ? <div class="Comment__box__tool">
              <div>
                {user.name}
              </div>
              <input type="submit" value="评论" />
            </div>
          : <div class="Comment__box__tool">
              <input
                value={this.state.formData.username}
                onInput={this.linkState("formData.username")}
                type="text"
                placeholder="用户名"
              />
              <input
                value={this.state.formData.useremail}
                onInput={this.linkState("formData.useremail")}
                type="email"
                placeholder="邮箱"
              />
              <input type="submit" value="评论" />
            </div>}
      </form>
    );
  }
}

const CommentList = ({ list }) =>
  <div class="Comment__list" id="comments">
    {list.map(item =>
      <div class="Comment__item">
        <Avatar
          class="Comment__avatar"
          name={item.username}
          avatar={item.useravatar}
        />
        <div class="Comment__detail">
          <div class="Comment__detail__header">
            <span className="Comment__detail__name">
              {item.username}
            </span>
            <TimeAgo
              class="Comment__detail__time"
              datetime={item.createdAt}
              locale="zh_CN"
            />
          </div>
          <div class="Comment__detail__body">
            {item.content}
          </div>
        </div>
      </div>
    )}
  </div>;

interface ICommentProps {
  postId: string;
  user: IUser;
}

export default class Comment extends Component<ICommentProps, any> {
  public componentWillMount() {
    this.fetchList();
  }

  public fetchList = async () => {
    const result = await http.get(`/posts/${this.props.postId}/comments`);

    this.setState({ list: result.data });
  };

  public render({ user }, { list }) {
    return (
      <div class="Comment">
        <CommentBox
          onSubmit={this.fetchList}
          user={user}
          postId={this.props.postId}
        />
        {list
          ? <CommentList list={list} />
          : <div class="Comment__loading">Loading...</div>}
      </div>
    );
  }
}
