import objectTypes from "../constants/objectTypes";

export default {
  title: "Hobby",
  name: objectTypes.hobby,
  type: "object",
  fields: [
    {
      name: "name",
      type: objectTypes.string,
      title: "Hobby Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hobbyImage",
      type: objectTypes.imageModel,
      title: "Image",
      validation: (Rule) => Rule.required(),
    },
  ],
};
