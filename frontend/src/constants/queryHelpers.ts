export default function getMoreBlogs(lastPublishDate: string, lastId: string) {
  return `{
  "totalCount": count(*[_type == "blogEntry"]),
  "list": *[_type == "blogEntry" && (
    publishDate < "${lastPublishDate}" ||
    (publishDate == "${lastPublishDate}" && _id > "${lastId}"))]
    | order(publishDate desc)[0...5]{
       "slug": slug.current,
       preview,
       publishDate,
       title,
       _id
      }
}`;
}
