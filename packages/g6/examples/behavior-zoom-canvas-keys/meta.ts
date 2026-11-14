// g6 example: Zoom canvas: keyboard shortcuts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: keyboard shortcuts',
  summary: 'trigger given as an object maps key combinations to zoomIn, zoomOut and reset, so the view zooms from the keyboard. The card presses the combinations on its own graph.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'trigger', 'zoomIn', 'zoomOut', 'reset'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md', 'repo/packages/site/common/api/behaviors/zoom-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
