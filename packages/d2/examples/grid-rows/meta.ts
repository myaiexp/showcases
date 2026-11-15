// d2 example: grid-rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'grid-rows',
  summary:
    'With only `grid-rows` set, D2 lays the shapes out in that many rows and adds columns as needed. Shapes inside a grid are placed by their order in the source, and no connections are drawn.',
  section: 'Grid Diagrams',
  tags: ['grid-rows'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
