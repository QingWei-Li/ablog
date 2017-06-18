import "@/styles/PageList.styl";
import { Component, h } from "preact";

const MainBanner = ({ count }) =>
  <div class="List__banner">
    <h1>全部文章</h1>
    <p>总共发布了 {count} 篇</p>
  </div>;

export default class List extends Component<any, null> {
  public async componentDidMount() {
    console.log(this.props);
  }

  public render() {
    return (
      <section class="List">
        <MainBanner count={50} />
      </section>
    );
  }
}
