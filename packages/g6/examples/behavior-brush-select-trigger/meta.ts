// g6 example: Brush select: trigger keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush select: trigger keys',
  summary: 'trigger sets the key or key combination held while dragging, here Shift, Alt, Control or Shift plus Alt, so a plain drag can still pan with drag-canvas.',
  section: 'Behavior',
  tags: ['brush-select', 'trigger', 'drag-canvas', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/BrushSelect.en.md', 'repo/packages/site/common/api/behaviors/brush-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
