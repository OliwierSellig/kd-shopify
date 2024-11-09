import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { structure } from './structure'
import { schemaTypes, singletonActions, singletonTypes } from './structure/schema-types'
import { showProductionUrl } from './utils/show-production-url'

export default defineConfig({
  name: 'default',
  title: 'kd-shopify',
  projectId: 'xx93h9mw',
  dataset: 'production',

  plugins: [structureTool({ structure }), media(), visionTool(), showProductionUrl()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
