// AntV Infographic example: Custom font: a different family for title and item labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom font: a different family for title and item labels',
  summary:
    'The docs set font-family twice: once under base.text for everything and once under item.label for only the item labels. This example registers showcase-serif and showcase-brush and uses the per-element form to give the title, item labels and descriptions each their own family; the steps rotate the assignments.',
  section: 'Custom fonts',
  tags: ['registerFont', 'font-family', 'title', 'item.label', 'item.desc', 'theme'],
  docs: [
    'repo/site/src/content/learn/custom-fonts.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
