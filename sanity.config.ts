import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/desk-structure';
import { masterSpaceTheme } from './sanity/theme';
import StudioLogo from './sanity/components/StudioLogo';

export default defineConfig({
  name: 'masterspace',
  title: 'MasterSpace CMS',
  projectId: 'ls1g2tok',
  dataset: 'production',
  basePath: '/admin',
  icon: StudioLogo,
  theme: masterSpaceTheme,
  plugins: [structureTool({ structure }), visionTool(), iconPicker()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
});
