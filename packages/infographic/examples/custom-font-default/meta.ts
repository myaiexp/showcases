// AntV Infographic example: Custom font: setDefaultFont for text with no font-family
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom font: setDefaultFont for text with no font-family',
  summary:
    'setDefaultFont changes the family used by every text that the theme does not name. The syntax below never mentions a font; each step sets a different registered family as the default and renders again. The default is page-wide, so cleanup puts it back to the library’s own default.',
  section: 'Custom fonts',
  tags: ['setDefaultFont', 'registerFont', 'default font', 'getFont'],
  docs: [
    'repo/site/src/content/learn/custom-fonts.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
