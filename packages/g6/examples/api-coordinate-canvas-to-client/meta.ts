// g6 example: Coordinates: getClientByCanvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinates: getClientByCanvas',
  summary: "graph.getClientByCanvas([x, y]) maps a canvas point to browser client coordinates. A callout follows the selected node using those numbers, minus the box's own client offset.",
  section: 'API',
  tags: ['getClientByCanvas', 'getElementPosition', 'click-select', 'GraphEvent.AFTER_TRANSFORM', 'Point'],
  docs: [
    'repo/packages/site/docs/api/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
