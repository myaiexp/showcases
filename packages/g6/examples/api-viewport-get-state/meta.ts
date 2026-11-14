// g6 example: Viewport: getZoom, getPosition and getRotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: getZoom, getPosition and getRotation',
  summary: 'A live read-out of graph.getZoom(), getPosition() and getRotation() while the canvas is dragged, wheel-zoomed and rotated with shift plus drag.',
  section: 'API',
  tags: ['getZoom', 'getPosition', 'getRotation', 'rotate-canvas', 'GraphEvent.AFTER_TRANSFORM'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
