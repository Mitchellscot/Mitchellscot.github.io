import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  name: objectTypes.tag,
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      title: 'Tag',
      name: 'tag',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'tag',
    },
  },
})
