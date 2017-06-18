import "@/styles/Flash.styl";
import { h } from "preact";

export default function Flash({ children = [], type = "default" }) {
  return (
    <div class={" Flash Flash--" + type}>
      <div class="container">{children}</div>
    </div>
  );
}
