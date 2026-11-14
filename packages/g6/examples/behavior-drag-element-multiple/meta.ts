// g6 example: Drag element: move a selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element: move a selection',
  summary: "drag-element with state: 'selected' next to click-select with multiple moves every selected node when one of them is dragged. The card pre-selects three nodes and drags one.",
  section: 'Behavior',
  tags: ['drag-element', 'state', 'click-select', 'multiple'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElement.en.md', 'repo/packages/site/common/api/behaviors/drag-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
