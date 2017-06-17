import Card from "@/components/Card";
import { IPost } from "@/interface";
import { http } from "@/utils";
import * as chunk from "chunk";
import { Component, h } from "preact";
import { Link } from "preact-router/match";

const Banner = () =>
  <div class="Home__banner">
    <h1>纸糊专栏</h1>
    <p>爱写不写，爱看不看</p>
  </div>;

const Placeholder = () =>
  <div class="row">
    {Array(2).fill("").map(n =>
      <div class="column Placeholder">
        <div class="Placeholder__avatar" />
        <div class="Placeholder__metaInline" />
        <div class="Placeholder__inline" />
        <div class="Placeholder__inline" />
        <div class="Placeholder__inline Placeholder__inline--leftover" />
      </div>
    )}
  </div>;

export default class Home extends Component<
  any,
  { newList: IPost; hotList: IPost }
> {
  public async componentDidMount() {
    const newList = await http.get("/posts?_limit=4");
    const hotList = await http.get("/posts?_limit=4");

    this.setState({
      newList: chunk(newList.data, 2),
      hotList: chunk(hotList.data, 2)
    });
  }

  public render({}, { newList, hotList }) {
    return (
      <section class="Home">
        <Banner />
        <p>
          <button class="button">开始写文章</button>
        </p>
        <div class="Home__part">
          <h4 class="Home__part__title">最新</h4>
          {Array.isArray(newList)
            ? newList.map((group: any[]) =>
                <div class="row">
                  {group.map(post => <Card className="column" post={post} />)}
                </div>
              )
            : <Placeholder />}
        </div>
        <div class="Home__part">
          <h4 class="Home__part__title">热门</h4>
          {Array.isArray(hotList)
            ? hotList.map((group: any[]) =>
                <div class="row">
                  {group.map(post => <Card className="column" post={post} />)}
                </div>
              )
            : <Placeholder />}
        </div>
        <div class="Home__part">
          <Link href="/posts">查看全部</Link>
        </div>
      </section>
    );
  }
}
