import objectTypes from "../constants/objectTypes";

export default {
  title: "Project",
  name: objectTypes.project,
  type: "object",
  fields: [
    {
      name: "projectName",
      type: objectTypes.string,
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      type: objectTypes.imageModel,
      title: "Image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      type: objectTypes.text,
      title: "Summary",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "buttons",
      type: objectTypes.array,
      of: [{ type: objectTypes.button }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
