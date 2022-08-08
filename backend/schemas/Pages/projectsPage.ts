import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default {
  name: pageTypes.projectsPage,
  title: 'Projects Page',
  type: 'document',
  fields: [
    {
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
      validation: (Rule: any) =>
        Rule.required().warning('You must give a page title and meta description'),
    },
    {
      name: 'title',
      title: 'Projects Page Title',
      type: objectTypes.string,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'projects',
      title: 'Project List',
      type: objectTypes.array,
      of: [{type: objectTypes.project}],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    },
  },
}
