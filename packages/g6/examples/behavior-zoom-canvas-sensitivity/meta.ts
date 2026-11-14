// g6 example: Zoom canvas: sensitivity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: sensitivity',
  summary: 'sensitivity scales how far each wheel step zooms; a slider changes it and the readout shows the zoom. The card zooms in and out under three values.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'sensitivity', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md', 'repo/packages/site/common/api/behaviors/zoom-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
