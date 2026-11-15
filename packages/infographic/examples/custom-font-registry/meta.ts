// AntV Infographic example: Custom font: getFont and getFonts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom font: getFont and getFonts',
  summary:
    'getFont(name) returns the entry registerFont stored (or null), and getFonts() lists every registered font, including the gallery’s own stand-ins for the built-in ones. The side panel prints the lookups for the font drawn in each step; the font itself is registered from a bundled stylesheet.',
  section: 'Custom fonts',
  tags: ['getFont', 'getFonts', 'registerFont', 'Font', 'fontFamily'],
  docs: [
    'repo/site/src/content/learn/custom-fonts.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
