import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  title: 'Hobby',
  name: objectTypes.hobby,
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: objectTypes.string,
      title: 'Hobby Name',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'hobbyImage',
      type: objectTypes.imageModel,
      title: 'Image',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
