// g6 example: Viewport: getCanvasCenter and getViewportCenter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: getCanvasCenter and getViewportCenter',
  summary: 'getCanvasCenter() is the viewport center in viewport coordinates and stays put; getViewportCenter() is the same spot in canvas coordinates and moves as the canvas pans and zooms. A marker node tracks it.',
  section: 'API',
  tags: ['getCanvasCenter', 'getViewportCenter', 'updateNodeData', 'GraphEvent.AFTER_TRANSFORM'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
