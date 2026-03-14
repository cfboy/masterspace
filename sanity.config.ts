import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'masterspace',
  title: 'MasterSpace CMS',
  projectId: 'ls1g2tok',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), iconPicker()],
  schema: {
    types: schemaTypes,
  },
});
