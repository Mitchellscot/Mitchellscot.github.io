export function getMoreBlogs(lastPublishDate: string, lastId: string) {
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
export function generateBlogEntryQuery(slug: string): string {
  return `*[_type == "blogEntry" && slug.current == "${slug}"] |
order(_updatedAt desc)[0]{
  "pageTitle": seo.pageTitle,
  "metaDescription": seo.metaDescription,
  title,
  "slug": slug.current,
  publishDate,
  "text": text[]{
      ...,
    markDefs[]{
    ...,
    _type== "internalLink" => {
    "key": _key,
    "internalLink": true,
    "type": @.reference->._type,
    "slug": @.reference->slug.current,
  },}},
  "image": mainImage.asset->url
}`;
}
