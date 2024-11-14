import { codeInput } from '@sanity/code-input'
import { FaProductHunt } from 'react-icons/fa'
import { WorkspaceOptions } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import deskStructure from '../structure'
import { schemaTypes } from '../schemas'

export const prod: WorkspaceOptions = {
  name: 'default',
  title: 'Production',
  projectId: 'zdpjfpgh',
  dataset: 'production',
  basePath: '/prod',
  icon: FaProductHunt,
  scheduledPublishing: { enabled: false },
  tasks: {
    enabled: false
  },
  plugins: [structureTool({ structure: deskStructure }), visionTool({ defaultDataset: 'production' }), codeInput()],
  schema: {
    types: schemaTypes,
  },
}
