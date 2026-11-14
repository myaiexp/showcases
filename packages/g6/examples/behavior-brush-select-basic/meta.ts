// g6 example: Brush select: Shift-drag a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush select: Shift-drag a box',
  summary: 'brush-select with its default Shift trigger selects the nodes inside a dragged box. The card replays a drag on a timer.',
  section: 'Behavior',
  tags: ['brush-select', 'trigger'],
  docs: ['repo/packages/site/docs/manual/behavior/BrushSelect.en.md', 'repo/packages/site/common/api/behaviors/brush-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
