export default {
  title: 'Hobby',
  name: 'hobby',
  type: 'object',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'hobbyName',
      validation: Rule => Rule.required()
    },
    {
      name: 'hobbyImage',
      type: 'imageModel',
      title: 'Image',
      validation: Rule => Rule.required()
    }
  ]
}
