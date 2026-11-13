// Pretext example: hyphenate long German and Finnish words with soft hyphens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hyphenate with soft hyphens',
  summary:
    'Soft hyphens are put into long words before prepareWithSegments(). A line that breaks at one ends with a visible hyphen that its width counts. The same text without them is shown beside it, and the full view checks the line count against the browser.',
  section: 'Manual line layout',
  tags: ['soft-hyphen', 'layoutWithLines', 'hyphenation', 'German', 'Finnish'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
