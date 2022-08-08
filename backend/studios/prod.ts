import {codeInput} from '@sanity/code-input'
import {FaProductHunt} from 'react-icons/fa'
import {WorkspaceOptions} from 'sanity'
import {deskTool} from 'sanity/desk'
import deskStructure from '../deskStructure'
import {schemaTypes} from '../schemas'

export const prod: WorkspaceOptions = {
  name: 'default',
  title: 'Production',
  projectId: 'zdpjfpgh',
  dataset: 'production',
  basePath: '/prod',
  icon: FaProductHunt,
  plugins: [deskTool({structure: deskStructure}), codeInput()],
  schema: {
    types: schemaTypes,
  },
}
