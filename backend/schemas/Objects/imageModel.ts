import objectTypes from '../constants/objectTypes'

export default {
  title: 'Image',
  name: objectTypes.imageModel,
  type: 'object',
  fields: [
    {
      name: 'image',
      type: objectTypes.image,
      title: 'Image Upload',
    },
    {
      name: 'altText',
      type: objectTypes.string,
      title: 'Alt Text',
    },
  ],
}
