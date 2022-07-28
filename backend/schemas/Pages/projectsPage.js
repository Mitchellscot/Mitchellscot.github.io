import objectTypes from '../constants/objectTypes';
import pageTypes from '../constants/pageTypes';

export default {
  name: pageTypes.projectsPage,
  title: 'Projects Page',
  type: 'document',
  fields: [
    {
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
      validation: Rule => Rule.required().warning('You must give a page title and meta description')
    }
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    }
  }
}
