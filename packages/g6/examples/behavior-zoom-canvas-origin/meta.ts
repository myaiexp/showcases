// g6 example: Zoom canvas: zoom origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: zoom origin',
  summary: 'origin fixes the point the view zooms around, here the viewport centre, instead of the pointer. The card zooms with the pointer near a corner under both settings.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'origin', 'getViewportCenter', 'setBehaviors'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md', 'repo/packages/site/common/api/behaviors/zoom-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
