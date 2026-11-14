// g6 example: Zoom canvas: wheel zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: wheel zoom',
  summary: 'zoom-canvas zooms the view with the mouse wheel, with an animation toggle. The card sends wheel events over the graph on a loop.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'animation'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md', 'repo/packages/site/common/api/behaviors/zoom-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
