import {defineArrayMember, defineField, defineType} from 'sanity'
import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default defineType({
  name: pageTypes.aboutPage,
  title: 'About Page',
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
      title: 'Title',
      name: 'title',
      type: objectTypes.string,
    }),
    defineField({
      title: 'Profile Picture',
      name: 'profilePic',
      type: objectTypes.imageModel,
    }),
    defineField({
      title: 'Introduction Text',
      name: 'introText',
      type: objectTypes.text,
    }),
    defineField({
      title: 'Introduction Image',
      name: 'introImage',
      type: objectTypes.imageModel,
    }),
    defineField({
      title: 'Intro Image Caption',
      name: 'introCaption',
      type: objectTypes.string,
    }),
    defineField({
      title: 'Hobbies',
      name: 'hobbies',
      type: 'array', //throws an error here if I use a const...
      of: [defineArrayMember({type: objectTypes.hobby})],
    }),
  ],
  preview: {
    select: {
      title: 'seo.pageTitle',
    },
  },
})
