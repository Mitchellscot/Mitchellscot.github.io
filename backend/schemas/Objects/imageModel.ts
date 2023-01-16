import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  title: 'Image',
  name: objectTypes.imageModel,
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: objectTypes.image,
      title: 'Image Upload',
    }),
    defineField({
      name: 'altText',
      type: objectTypes.string,
      title: 'Alt Text',
    }),
  ],
})
