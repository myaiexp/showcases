// g6 example: Drag canvas: enable and onFinish
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag canvas: enable and onFinish',
  summary: 'enable switches panning on and off, and onFinish runs when a drag ends. The card drags with panning disabled every third time and counts finished drags.',
  section: 'Behavior',
  tags: ['drag-canvas', 'enable', 'onFinish'],
  docs: ['repo/packages/site/docs/manual/behavior/DragCanvas.en.md', 'repo/packages/site/common/api/behaviors/drag-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
