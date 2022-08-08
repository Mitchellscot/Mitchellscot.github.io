import objectTypes from '../constants/objectTypes'

export default {
  name: objectTypes.tag,
  title: 'Tag',
  type: 'document',
  fields: [
    {
      title: 'Tag',
      name: 'tag',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'tag',
    },
  },
}
