// d2 example: Rows and columns together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows and columns together',
  summary:
    'Setting `grid-rows: 2` and `grid-columns: 2` makes a 2x2 grid, filled in source order. The three shapes leave the last cell empty.',
  section: 'Grid Diagrams',
  tags: ['grid-rows', 'grid-columns'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-4.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
