import objectTypes from '../constants/objectTypes';
import pageTypes from '../constants/pageTypes';

export default {
  name: pageTypes.blogEntry,
  title: 'Blog',
  type: 'document',
  fields: [
    {
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
    },
    {
      name: 'title',
      title: 'Blog Entry Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100)
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Publish date',
      name: 'publishDate',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      title: 'Preview Text',
      name: 'preview',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    }
  }
}
