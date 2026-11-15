// d2 example: Nested grids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested grids',
  summary:
    'Grids, sequence diagrams and plain diagrams can all be cells of a grid. The outer grid has one column; its middle cell is a two-column grid for content and sidebar. The empty label `""` hides the body\'s own text.',
  section: 'Grid Diagrams',
  tags: ['grid-columns', 'grid-gap', 'container'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-nested-grid.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
