import pageTypes from '../constants/pageTypes'

export default {
    name: pageTypes.aboutPage,
    title: 'About Page',
    type: 'document',
    fields: [
        {
            title: 'SEO Data',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().warning('You must give a page title and meta description')
        }
    ],
    preview: {
        select: {
            title: 'seo.title',
        }
    }
}
