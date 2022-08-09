import {codeInput} from '@sanity/code-input'
import {FaDev} from 'react-icons/fa'
import {WorkspaceOptions} from 'sanity'
import {deskTool} from 'sanity/desk'
import deskStructure from '../deskStructure'
import {schemaTypes} from '../schemas'

export const dev: WorkspaceOptions = {
  name: 'dev',
  title: 'Development',
  projectId: 'zdpjfpgh',
  dataset: 'development',
  basePath: '/dev',
  icon: FaDev,
  plugins: [deskTool({structure: deskStructure}), codeInput()],
  schema: {
    types: schemaTypes,
  },
}
