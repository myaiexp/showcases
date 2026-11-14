// g6 example: Coordinates: getCanvasByViewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinates: getCanvasByViewport',
  summary: 'graph.getCanvasByViewport([x, y]) maps a point in the canvas box to canvas coordinates. It is used here as a hit test: the node nearest the pointer, in canvas space, lights up.',
  section: 'API',
  tags: ['getCanvasByViewport', 'getNodeData', 'setElementState', 'Point'],
  docs: [
    'repo/packages/site/docs/api/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
