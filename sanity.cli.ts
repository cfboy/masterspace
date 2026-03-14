import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ls1g2tok',
    dataset: 'production',
  },
  studioHost: 'masterspace',
  vite: (prev) => ({
    ...prev,
    // Sanity Studio runs on a separate entry point — don't resolve the main app's aliases
    resolve: {
      ...prev.resolve,
      alias: {},
    },
  }),
});
