export default {
  title: 'Image',
  name: 'imageModel',
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image Upload',
      validation: Rule => Rule.required()
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
    },
    {
      name: 'width',
      type: 'string',
      title: 'Image Width',
      validation: Rule => Rule.required()
    },
    {
      name: 'height',
      type: 'string',
      title: 'Image Height',
      validation: Rule => Rule.required()
    }
  ]
}
