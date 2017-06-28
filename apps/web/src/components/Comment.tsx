import { IUser } from "@/interface";
import "@/styles/Comment.styl";
import { http } from "@/utils";
import { Component, h } from "preact";

const CommentBox = ({ user }) =>
  <form class="Comment__box">
    <textarea cols={30} rows={10} />
    {user
      ? <div class="Comment__box__tool">
          <div>
            {user.name}
          </div>
          <input type="submit" value="评论" />
        </div>
      : <div class="Comment__box__tool">
          <input type="text" placeholder="用户名" />
          <input type="email" placeholder="邮箱" />
          <input type="submit" value="评论" />
        </div>}
  </form>;

const CommentList = ({ list }) =>
  <div class="Comment__list">
    <div>1222</div>
  </div>;

interface ICommentProps {
  postId: string;
  user: IUser;
}

export default class Comment extends Component<ICommentProps, any> {
  public async componentWillMount() {
    const postId = this.props.postId;

    const result = await http.get("/comments", {
      params: {
        post: postId
      }
    });

    console.log(result.data);
  }

  public render({ user }, { list }) {
    return (
      <div class="Comment">
        <CommentBox user={user} />
        {list ? <CommentList list={list} /> : <div>Loading...</div>}
      </div>
    );
  }
}
