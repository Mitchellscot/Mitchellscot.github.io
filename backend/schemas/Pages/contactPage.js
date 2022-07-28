import objectTypes from "../constants/objectTypes";
import pageTypes from "../constants/pageTypes";

export default {
  name: pageTypes.contactPage,
  title: "Contact Page",
  type: "document",
  fields: [
    {
      title: "SEO Data",
      name: "seo",
      type: objectTypes.seo,
      validation: (Rule) =>
        Rule.required().warning(
          "You must give a page title and meta description"
        ),
    },
    {
      name: "title",
      title: "Contact Page Title",
      type: objectTypes.string,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "seo.pageTitle",
    },
  },
};
