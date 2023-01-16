import {defineField} from 'sanity'
import objectTypes from '../constants/objectTypes'

export default defineField({
  title: 'Button',
  name: objectTypes.button,
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: objectTypes.string,
      title: 'Text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'style',
      type: objectTypes.string,
      title: 'Style',
      options: {
        list: [
          {title: 'Orange', value: 'orange'},
          {title: 'Blue', value: 'blue'},
          {title: 'White', value: 'white'},
          {title: 'Transparent', value: 'transparent'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: objectTypes.string,
      title: 'Link',
      description: 'Remember to provide the full link or next will think it is an internal link',
    }),
  ],
})
