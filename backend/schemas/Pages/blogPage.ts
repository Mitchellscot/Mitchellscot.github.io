import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default defineField({
  name: pageTypes.blogPage,
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
      validation: (Rule: any) =>
        Rule.required().warning('You must give a page title and meta description'),
    }),
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    },
  },
})
