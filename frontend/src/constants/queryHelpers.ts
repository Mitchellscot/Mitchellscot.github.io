export default function paginatedBlogPreviews(begin: number, end: number) {
  return `*[_type == "blogEntry"]
    | order(publishDate desc)[${begin}...${end}]{
       "slug": slug.current,
       preview,
       publishDate,
       title
  }`;
}
