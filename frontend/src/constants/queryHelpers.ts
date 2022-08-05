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
       _id,
       "tags": tags[]->tag
      }
}`;
}
export function getBlogPreviewsByTag(tag: string): string {
  return `*[_type == "blogPage"] |
  order(_updatedAt desc)[0]{
  "pageTitle": seo.pageTitle,
  "metaDescription": seo.metaDescription,
  "blogList": *[_type == "blogEntry" && "${tag}" in tags[]->tag]
     | order(publishDate desc)[0...5]{
        "slug": slug.current,
        preview,
        publishDate,
        title,
        _id,
        "tags": tags[]->tag
   },
   "totalCount": count(*[_type == "blogEntry" && "${tag}" in tags[]->tag])
}`;
}
export function generateBlogEntryQuery(slug: string): string {
  return `*[_type == "blogEntry" && slug.current ==
  "${slug}"] |
order(_updatedAt desc)[0]{
  "pageTitle": seo.pageTitle,
  "metaDescription": seo.metaDescription,
  title,
  "tags": tags[]->tag,
  "image": {
  "url": mainImage.asset->url,
  "height": mainImage.asset->metadata.dimensions.height,
  "width": mainImage.asset->metadata.dimensions.width,
  "alt": ""
},
  "slug": slug.current,
  publishDate,
  "text": text[]{
      ...,
    _type=="image" =>{
   "key": _key,
   "alt": alt,
   "url": asset->url,
   "width": asset->metadata.dimensions.width,
   "height": asset->metadata.dimensions.height,
  ...
},
    markDefs[]{
    ...,
    _type== "internalLink" => {
    "key": _key,
    "internalLink": true,
    "type": @.reference->._type,
    "slug": @.reference->slug.current,
  },}}
}`;
}
