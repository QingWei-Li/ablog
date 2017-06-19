import Avatar from "@/components/Avatar";
import { IPost } from "@/interface";
import "@/styles/Card.styl";
import { random } from "@/utils";
import { h } from "preact";
import { Link } from "preact-router/match";
import TimeAgo from "timeago-react";

function randomImage() {
  return `https://unsplash.it/600/${random(600, 700)}`;
}

export default function({
  className = "",
  post
}: {
  className?: string;
  post: IPost;
}) {
  return (
    <div class={`${className} Card`}>
      <div class="Card__picture">
        <Link
          style={{
            backgroundImage: `url(${post.picture || randomImage()})`
          }}
          href={`/p/${post._id}`}
        />
      </div>
      <div class="Card__main">
        <h3><Link href={`/p/${post._id}`}>{post.title}</Link></h3>
        <p>{post.summary}</p>
        <div class="Card__footer">
          <div class="Card__user">
            <Link href={`/u/${post.author.name}`}>
              {post.author.name}
            </Link>
            <span class="Card__user__part">发表于</span>
            <TimeAgo datetime={post.createdAt} locale="zh_CN" />
          </div>
          <Link href={`/p/${post._id}#comments`}>
            {post.comments} 条评论
          </Link>
        </div>
      </div>
    </div>
  );
}
