import "@/styles/Placeholder.styl";
import { h } from "preact";

export function EditPlaceholder() {
  return (
    <div>
      <div class="Placeholder">
        <div class="Placeholder__img" />
      </div>
      {Array(4).fill("").map((o, index) =>
        <div class="Placeholder">
          {Array(3 - index)
            .fill("")
            .map(() => <div class="Placeholder__inline" />)}
          <div
            class={
              "Placeholder__inline " +
              (index < 3 ? "Placeholder__inline--leftover" : "")
            }
          />
        </div>
      )}
    </div>
  );
}

export function CardPlaceholder() {
  return (
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
    </div>
  );
}

export function LoginPlaceholder() {
  return (
    <div style="Login">
      <div class="column Placeholder">
        <div class="Placeholder__avatar" />
        <div class="Placeholder__metaInline" />
        <div class="Placeholder__inline" />
        <div class="Placeholder__inline" />
        <div class="Placeholder__inline Placeholder__inline--leftover" />
      </div>
    </div>
  );
}
