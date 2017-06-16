import Card from "@/components/Card";
import { Component, h } from "preact";

const Banner = () =>
  <div className="Home__banner">
    <h1>纸糊专栏</h1>
    <p>爱写不写 ，爱看不看</p>
  </div>;

export default class Home extends Component<any, any> {
  public render() {
    return (
      <section class="Home">
        <Banner />
        <p>
          <button class="button">开始写文章</button>
        </p>
        <div class="row Home__posts">
          <Card className="column" />
          <Card className="column" />
        </div>
      </section>
    );
  }
}
