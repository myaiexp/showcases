// AntV Infographic example: Custom template: a built-in template with one part swapped
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom template: a built-in template with one part swapped',
  summary:
    'getTemplate returns a built-in template’s options, so a new one can be a spread of it with one field replaced. It is registered as showcase-tall-column, which swaps the item for badge-card, widens the gap and changes the palette; the steps show the built-in next to the copy.',
  section: 'Custom templates',
  tags: ['getTemplate', 'registerTemplate', 'getTemplates', 'themeConfig', 'spread'],
  docs: [
    'repo/site/src/content/learn/custom-template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
