import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'


import aboutPage from './Pages/aboutPage'

import seo from './Objects/seo'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    aboutPage,

    seo
  ]),
})
