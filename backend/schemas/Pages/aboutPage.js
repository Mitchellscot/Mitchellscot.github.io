import objectTypes from "../constants/objectTypes";
import pageTypes from "../constants/pageTypes";

export default {
  name: pageTypes.aboutPage,
  title: "About Page",
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
      title: "Title",
      name: "title",
      type: objectTypes.string,
    },
    {
      title: "Profile Picture",
      name: "profilePic",
      type: objectTypes.imageModel,
    },
    {
      title: "Introduction Text",
      name: "introText",
      type: objectTypes.text,
    },
    {
      title: "Introduction Image",
      name: "introImage",
      type: objectTypes.imageModel,
    },
    {
      title: "Intro Image Caption",
      name: "introCaption",
      type: objectTypes.string,
    },
    {
      title: "Hobbies",
      name: "hobbies",
      type: objectTypes.array,
      of: [{ type: objectTypes.hobby }],
    },
  ],
  preview: {
    select: {
      title: "seo.pageTitle",
    },
  },
};
