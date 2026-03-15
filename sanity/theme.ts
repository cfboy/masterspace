import { buildTheme } from '@sanity/ui/theme';

export const masterSpaceTheme = buildTheme({
  color: {
    base: {
      // Use orange hue as primary (closest to gold #C9A96E)
      primary: {
        _hue: 'orange',
      },
      positive: {
        _hue: 'green',
      },
      caution: {
        _hue: 'yellow',
      },
      critical: {
        _hue: 'red',
      },
    },
  },
});
