import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import "@/styles/PageList.styl";
import { http } from "@/utils";
import { Component, h } from "preact";

const MainBanner = ({ count }) =>
  <div class="List__banner">
    <h1>全部文章</h1>
    <p>总共发布了 {count} 篇</p>
  </div>;

const UserBanner = ({ user, count }) =>
  <div class="List__banner">
    <p>
      <Avatar {...user} />
    </p>
    <h3>{user.name}</h3>
    <p>总共发布了 {count} 篇</p>
  </div>;

export default class List extends Component<any, any> {
  public state = { count: 0, data: [], user: undefined };

  public async componentWillMount() {
    const { name } = this.props;
    const query: any = {};

    if (name) {
      const user = (await http.get(`/user?name=${name}`)).data;
      query.author = user.name;
      this.setState({ user });
    }

    const result = await http.get("/posts", {
      params: query
    });

    this.setState(result.data);
  }

  public render({}, { data, count, user }) {
    return (
      <section class="List">
        {user
          ? <UserBanner user={user} count={count} />
          : <MainBanner count={count} />}
        <div>
          {data.map(post => <Card post={post} />)}
        </div>
      </section>
    );
  }
}
