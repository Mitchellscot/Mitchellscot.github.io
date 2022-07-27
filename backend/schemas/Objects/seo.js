export default {
    title: 'Seo Data',
    name: 'seo',
    description: 'Page Title and Description - for SEO Purposes',
    type: 'object',
    fields: [
        {
            name: 'pageTitle',
            type: 'string',
            title: 'Page Title',
            validation: Rule => Rule.required()
        },
        {
            name: 'metaDescription',
            type: 'text',
            title: 'Meta Description',
            validation: Rule => Rule.required()
        }
    ]
}