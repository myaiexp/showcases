// g6 example: Graph options zoom, x, y and rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph options zoom, x, y and rotation',
  summary:
    'The starting viewport: zoom scale, x and y offset of the origin, and rotation in radians. These are read at construction, so each change rebuilds the graph.',
  section: 'Graph',
  tags: ['zoom', 'x', 'y', 'rotation'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
