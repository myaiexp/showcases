// AntV Infographic example: Custom font: registerFont and font-family in the theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom font: registerFont and font-family in the theme',
  summary:
    'registerFont gives a family name, a base URL and a weight-to-file map; the theme then asks for it with base.text.font-family. Here the files are bundled and the stylesheet URL is a blob, so showcase-serif and showcase-hand both load without a network. The steps move the same infographic between the default font and the two new ones.',
  section: 'Custom fonts',
  tags: ['registerFont', 'font-family', 'base.text', 'Font', 'fontWeight'],
  docs: [
    'repo/site/src/content/learn/custom-fonts.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
