// g6 example: Zoom canvas: modifier key trigger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: modifier key trigger',
  summary: 'trigger set to a key such as Control or Shift makes the wheel zoom only while that key is held. The card holds the key on its own graph and sends wheel events with and without it.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'trigger', 'Control', 'Shift'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md', 'repo/packages/site/common/api/behaviors/zoom-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
