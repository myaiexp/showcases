// g6 example: Coordinate systems: canvas, viewport and client
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinate systems: canvas, viewport and client',
  summary: "One node's canvas position stays fixed while its viewport and client positions change as the canvas is panned and zoomed. Drag or wheel-zoom, or watch the card do it.",
  section: 'Further Reading',
  tags: ['getElementPosition', 'getViewportByCanvas', 'getClientByCanvas', 'getViewportCenter', 'GraphEvent.AFTER_TRANSFORM'],
  docs: [
    'repo/packages/site/docs/manual/further-reading/coordinate.en.md',
    'repo/packages/site/docs/api/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
