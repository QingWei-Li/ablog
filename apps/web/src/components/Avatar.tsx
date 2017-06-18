import { h } from "preact";

export default function Avatar({ avatar, name, ...props }) {
  return (
    <img
      {...props}
      src={avatar || `//api.adorable.io/avatar/${name}`}
      alt={name}
    />
  );
}
