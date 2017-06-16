interface System {
  import<T>(module: string): Promise<T>;
}

declare var System: System;
