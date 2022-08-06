export const queries = {
  AboutPage: `*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
    "pageTitle": seo.pageTitle,
    "metaDescription": seo.metaDescription,
     title,
    "profilePicture":{
    "url": profilePic.image.asset->url,
    "height": profilePic.image.asset->metadata.dimensions.height,
    "width": profilePic.image.asset->metadata.dimensions.width,
    "alt": profilePic.altText
  },
 introText,
 "introImage":{
 "url": introImage.image.asset->url,
 "height": introImage.image.asset->metadata.dimensions.height,
 "width": introImage.image.asset->metadata.dimensions.width,
 "alt": introImage.altText
  },
 introCaption,
 "hobbies": hobbies[]{
  name,
  "hobbyImage": hobbyImage{
 "url": image.asset->url,
 "height": image.asset->metadata.dimensions.height,
 "width": image.asset->metadata.dimensions.width,
 "alt": altText
}}
}`,
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
          _id,
          "tags": tags[]->tag
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
  StatsPage: `*[_type == "statsPage"] | order(_updatedAt desc)[0]{
    "pageTitle": seo.pageTitle,
    "metaDescription": seo.metaDescription,
    title
  }`,
  ContactPage: `*[_type == "contactPage"] | order(_updatedAt desc)[0]{
    "pageTitle": seo.pageTitle,
    "metaDescription": seo.metaDescription,
    title
  }`,
  GetAllBlogSlugs: `*[_type == "blogEntry"] | order(slug.current)[].slug.current`,
  GetAllTags: `*[_type == "tag"].tag`,
  GetTagsPage: `{
    "tags": *[_type == "tag"].tag
  }`,
};
export default queries;
