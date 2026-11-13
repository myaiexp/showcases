// Pretext example: masonry columns placed from layout() heights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Masonry cards',
  summary:
    'Text cards are placed into columns, shortest first, using heights from layout() alone. The column count follows the container width and nothing is measured in the DOM.',
  section: 'Measure height',
  tags: ['masonry', 'layout', 'columns', 'resize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
