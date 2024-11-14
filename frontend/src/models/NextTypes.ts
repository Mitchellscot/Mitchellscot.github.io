export interface PageParams<
  P = undefined,
  S = Record<string, string | string[] | undefined>,
> {
  params: P;
  searchParams: S;
}

export interface SlugParam {
  slug: string;
}
