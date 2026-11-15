// AntV Infographic example: Custom theme: derive one from a built-in with getTheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom theme: derive one from a built-in with getTheme',
  summary:
    'getTheme returns the config of a registered theme, so showcase-dark-gold is the built-in dark theme spread into a new object with a gold primary colour and a gold title. The side panel prints getTheme for the new name, and the steps compare dark, the copy and the copy with a palette line.',
  section: 'Custom themes',
  tags: ['getTheme', 'getThemes', 'registerTheme', 'dark', 'title', 'spread'],
  docs: [
    'repo/site/src/content/learn/custom-theme.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
