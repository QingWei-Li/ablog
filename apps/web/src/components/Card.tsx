import { IPost } from "@/interface";
import { random } from "@/utils";
import { h } from "preact";

export default function({
  className,
  post
}: { className: string; post: IPost }) {
  return (
    <div class={`${className} Card`}>
      <div class="Card__picture">
        <a
          style={{
            backgroundImage: `url(https://unsplash.it/600/${random(600, 700)})`
          }}
          href={post.url}
        />
      </div>
      <div class="Card__content">abc</div>
    </div>
  );
}
