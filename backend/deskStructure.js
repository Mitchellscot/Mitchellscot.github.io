import S from '@sanity/desk-tool/structure-builder'
import pageTypes from './schemas/constants/pageTypes'

export default () =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('About Page')
                .child(
                    S.document()
                        .schemaType(pageTypes.aboutPage)
                        .documentId(pageTypes.aboutPage)
                ),
            S.listItem()
                .title('Contact Page')
                .child(
                    S.document()
                        .schemaType(pageTypes.contactPage)
                        .documentId(pageTypes.contactPage)
                ),
            S.listItem()
                .title('Blog Page')
                .child(
                    S.document()
                        .schemaType(pageTypes.blogPage)
                        .documentId(pageTypes.blogPage)
                ),
            S.listItem()
                .title('Projects Page')
                .child(
                    S.document()
                        .schemaType(pageTypes.projectsPage)
                        .documentId(pageTypes.projectsPage)
                ),
            S.listItem()
                .title('Stats Page')
                .child(
                    S.document()
                        .schemaType(pageTypes.statsPage)
                        .documentId(pageTypes.statsPage)
                ),
            S.divider(),
            ...S.documentTypeListItems().filter(
                item => ![
                    pageTypes.aboutPage,
                    pageTypes.contactPage,
                    pageTypes.blogPage,
                    pageTypes.projectsPage,
                    pageTypes.statsPage
                ].includes(item.getId()))
        ])

