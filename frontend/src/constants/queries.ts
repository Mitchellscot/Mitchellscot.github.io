//see https://www.sanity.io/docs/paginating-with-groq for faster pagination.
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
};
