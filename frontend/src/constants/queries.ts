export const queries = {
    AboutPage: `*[_type == "aboutPage"] | order(_updatedAt desc)[0]`,
    HomePage: `*[_type == "blogPage"] | order(_updatedAt desc)[0]{
        "pageTitle": seo.pageTitle,
        "metaDescription": seo.metaDescription
    }`,
  };
  