// g6 example: Viewport: setZoomRange and getZoomRange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: setZoomRange and getZoomRange',
  summary: 'graph.setZoomRange([min, max]) clamps zoomTo, zoomBy and wheel zoom; setZoomRange(undefined) lifts the limit and getZoomRange() reads it back.',
  section: 'API',
  tags: ['setZoomRange', 'getZoomRange', 'zoomTo', 'zoom-canvas'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
