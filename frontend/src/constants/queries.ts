export const queries = {
  AboutPage: `*[_type == "aboutPage"] | order(_updatedAt desc)[0]`,
  HomePage: `*[_type == "blogPage"] |
    order(_updatedAt desc)[0]{
    "pageTitle": seo.pageTitle,
    "metaDescription": seo.metaDescription,
    "blogList": *[_type == "blogEntry"]
       | order(publishDate desc)[0...5]{
          "slug": slug.current,
          preview,
          publishDate,
          title,
          _id
     },
     "totalCount": count(*[_type == "blogEntry"])
  }`,
  ProjectsPage: `*[_type == "projectsPage"] |
  order(_updatedAt desc)[0]{
    "pageTitle": seo.pageTitle,
    "metaDescription": seo.metaDescription,
    title,
    "projects": projects[]{
     "title": projectName,
     "image": mainImage{
      "url": image.asset->url,
      "height": image.asset->metadata.dimensions.height,
      "width": image.asset->metadata.dimensions.width,
      "alt": altText
      },
    "summary": summary,
    "buttons": buttons[]{
      label,
      style,
      link
    }
  }
}`,
  GetAllBlogSlugs: `*[_type == "blogEntry"] | order(slug.current){
  "slug": slug.current
}`,
};
export default queries;
