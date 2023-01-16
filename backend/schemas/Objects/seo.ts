import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  title: 'Seo Data',
  name: objectTypes.seo,
  type: 'object',
  fields: [
    defineField({
      name: 'pageTitle',
      type: objectTypes.string,
      title: 'Page Title',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      type: objectTypes.text,
      title: 'Meta Description',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
