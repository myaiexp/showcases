// g6 example: Drag canvas: arrow keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag canvas: arrow keys',
  summary: 'trigger maps arrow keys to up, down, left and right moves of the canvas; sensitivity sets the distance per press and animation smooths it.',
  section: 'Behavior',
  tags: ['drag-canvas', 'trigger', 'sensitivity', 'animation'],
  docs: ['repo/packages/site/docs/manual/behavior/DragCanvas.en.md', 'repo/packages/site/common/api/behaviors/drag-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
