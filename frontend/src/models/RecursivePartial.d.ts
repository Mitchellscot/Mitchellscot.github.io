type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends record<string, unknown>
      ? RecursivePartial<T[P]>
      : T[P];
};
