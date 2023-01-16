import {defineArrayMember, defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default defineField({
  name: pageTypes.projectsPage,
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
      validation: (Rule: any) =>
        Rule.required().warning('You must give a page title and meta description'),
    }),
    defineField({
      name: 'title',
      title: 'Projects Page Title',
      type: objectTypes.string,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Project List',
      type: 'array',
      of: [
        defineArrayMember({
          type: objectTypes.project,
        }),
      ],
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    },
  },
})
