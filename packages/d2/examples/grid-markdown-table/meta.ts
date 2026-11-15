// d2 example: A Markdown table instead
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A Markdown table instead',
  summary:
    'A `||md` block holding a pipe table renders as a table with one shape. Use it rather than a zero-gap grid when many cells share text.',
  section: 'Grid Diagrams',
  tags: ['markdown', 'table'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/md-table.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
