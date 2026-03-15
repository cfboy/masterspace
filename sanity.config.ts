import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { structureTool } from 'sanity/structure';

import StudioLogo from './sanity/components/StudioLogo';
import { structure } from './sanity/desk-structure';
import { schemaTypes } from './sanity/schemas';
import { masterSpaceTheme } from './sanity/theme';

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
