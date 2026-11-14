// g6 example: Coordinates: getViewportByCanvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinates: getViewportByCanvas',
  summary: 'graph.getViewportByCanvas([x, y]) maps a canvas point to a spot in the canvas box. HTML badges are placed on three nodes with it and follow when the canvas is panned or zoomed.',
  section: 'API',
  tags: ['getViewportByCanvas', 'getElementPosition', 'GraphEvent.AFTER_TRANSFORM', 'Point'],
  docs: [
    'repo/packages/site/docs/api/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
