export default {
    title: 'Seo Data',
    name: 'seo',
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
