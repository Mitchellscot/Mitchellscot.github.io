import S from '@sanity/desk-tool/structure-builder'

export default () =>{
    S.list()
        .title('Content')
        .items([
            S.listItem().title('')
            .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.divider(),
            ...S.documentTypeListItems().filter(item => !['aboutPage'].includes(item.getId()))

        ])
}