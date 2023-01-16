import {defineArrayMember, defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  title: 'Project',
  name: objectTypes.project,
  type: 'object',
  fields: [
    defineField({
      name: 'projectName',
      type: objectTypes.string,
      title: 'Name',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: objectTypes.imageModel,
      title: 'Image',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: objectTypes.text,
      title: 'Summary',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [defineArrayMember({type: objectTypes.button})],
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
