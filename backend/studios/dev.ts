import { codeInput } from '@sanity/code-input'
import { FaDev } from 'react-icons/fa'
import { WorkspaceOptions } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import deskStructure from '../structure'
import { schemaTypes } from '../schemas'

export const dev: WorkspaceOptions = {
  name: 'dev',
  title: 'Development',
  projectId: 'zdpjfpgh',
  dataset: 'development',
  basePath: '/dev',
  icon: FaDev,
  scheduledPublishing: { enabled: false },
  tasks: {
    enabled: false
  },
  plugins: [structureTool({ structure: deskStructure }), visionTool({ defaultDataset: 'development' }), codeInput()],
  schema: {
    types: schemaTypes,
  },
}
