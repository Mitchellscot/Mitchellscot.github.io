import objectTypes from "../constants/objectTypes";

export default {
  title: "Seo Data",
  name: objectTypes.button,
  type: "object",
  fields: [
    {
      name: "buttonText",
      type: objectTypes.string,
      title: "Text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "buttonStyle",
      type: objectTypes.string,
      title: "Style",
      options: {
        list: [
          { title: "Orange", value: "orange" },
          { title: "Blue", value: "blue" },
          { title: "Transparent", value: "transparent" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      type: objectTypes.string,
      title: "Link",
      description:
        "Remember to provide the full link or next will think it is an internal link",
    },
  ],
};
