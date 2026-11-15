// AntV Infographic example: Custom theme: title, description and item label styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom theme: title, description and item label styles',
  summary:
    'A registered theme can style the pieces separately: title and desc set the heading text, and item.label and item.desc set what every item prints. showcase-paper uses a warm background with dark ink, a serif title and a coloured label; the steps swap it with a second registered theme to show the theme travels with the name.',
  section: 'Custom themes',
  tags: ['registerTheme', 'title', 'desc', 'item.label', 'item.desc', 'TextAttributes'],
  docs: [
    'repo/site/src/content/learn/custom-theme.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
