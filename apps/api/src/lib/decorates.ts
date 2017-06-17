import { Inject } from "trafficlight";

export function CurrentSession() {
  return Inject(ctx => ctx.session);
}
