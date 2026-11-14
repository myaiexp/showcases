// g6 example: Zoom canvas: zoomRange limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: zoomRange limits',
  summary: 'The graph option zoomRange bounds how far zoom-canvas can zoom; sliders call setZoomRange. The card keeps zooming in and out against a 0.5 to 2 range.',
  section: 'Behavior',
  tags: ['zoomRange', 'setZoomRange', 'zoom-canvas'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
