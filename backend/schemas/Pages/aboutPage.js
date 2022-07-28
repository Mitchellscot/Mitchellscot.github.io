import objectTypes from '../constants/objectTypes';
import pageTypes from '../constants/pageTypes';

export default {
    name: pageTypes.aboutPage,
    title: 'About Page',
    type: 'document',
    fields: [
        {
            title: 'SEO Data',
            name: 'seo',
            type: objectTypes.seo,
            validation: Rule => Rule.required().warning('You must give a page title and meta description')
        },
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Profile Picture',
            name: 'profilePic',
            type: 'imageModel'
        },
        {
            title: 'Introduction Text',
            name: 'introText',
            type: 'text'
        },
        {
            title: 'Introduction Image',
            name: 'introImage',
            type: 'imageModel'
        },
        {
            title: 'Intro Image Caption',
            name: 'introCaption',
            type: 'string'
        },
        {
            title: 'Hobbies',
            name: 'hobbies',
            type: 'array',
            of: [{ type: 'hobby' }]
        }
    ],
    preview: {
        select: {
            title: 'seo.pageTitle',
        }
    }
}
