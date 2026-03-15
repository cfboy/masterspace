import { buildLegacyTheme } from 'sanity';

export const masterSpaceTheme = buildLegacyTheme({
  '--black': '#111110',
  '--white': '#F5F0EB',
  '--gray': '#2A2926',
  '--gray-base': '#1C1B1A',
  '--component-bg': '#151413',
  '--component-text-color': '#F5F0EB',

  // Brand
  '--brand-primary': '#C9A96E',

  // Navbar
  '--main-navigation-color': '#111110',
  '--main-navigation-color--inverted': '#F5F0EB',

  // Buttons
  '--default-button-color': '#D4D0CA',
  '--default-button-primary-color': '#C9A96E',
  '--default-button-success-color': '#6EC98A',
  '--default-button-warning-color': '#E0B44A',
  '--default-button-danger-color': '#D46B6B',

  // State
  '--state-info-color': '#6EAAC9',
  '--state-success-color': '#6EC98A',
  '--state-warning-color': '#E0B44A',
  '--state-danger-color': '#D46B6B',
});
