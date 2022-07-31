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
          title
     }
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
      "width": width,
      "height": height,
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
};
