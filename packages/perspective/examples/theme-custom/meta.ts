// Perspective example: a custom theme from a bundled theme's variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A forked custom theme',
  summary:
    'Themes are collections of CSS variables, so a new one is a copy of Nord\'s variable list with an ember palette under the theme name "Ember". resetThemes() registers it alongside Nord and Pro Dark for comparison.',
  section: 'Theming',
  tags: ['custom theme', 'CSS variables', '--psp-theme-name', 'resetThemes', 'theme attribute'],
  docs: ['repo/docs/md/how_to/javascript/theming.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
