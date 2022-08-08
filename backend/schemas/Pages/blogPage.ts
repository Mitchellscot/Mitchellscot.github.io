import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default {
  name: pageTypes.blogPage,
  title: 'Blog Page',
  type: 'document',
  fields: [
    {
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
      validation: (Rule: any) =>
        Rule.required().warning('You must give a page title and meta description'),
    },
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    },
  },
}
