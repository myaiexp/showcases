// d2 example: Connections in and around grids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Connections in and around grids',
  summary:
    'A connection to the grid itself works as it does for any container. Connections between two cells of a grid, with dagre or ELK, are straight segments from centre to centre with no path-finding.',
  section: 'Grid Diagrams',
  tags: ['grid-columns', 'connection'],
  docs: ['repo/docs/tour/grid-diagrams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
