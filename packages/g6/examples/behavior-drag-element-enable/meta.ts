// g6 example: Drag element: enable and trigger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element: enable and trigger',
  summary: 'enable takes a function of the event to allow dragging nodes, combos, both or neither; trigger can require a key held while dragging. The card tries to drag a node and a combo under each rule.',
  section: 'Behavior',
  tags: ['drag-element', 'enable', 'trigger', 'targetType'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElement.en.md', 'repo/packages/site/common/api/behaviors/drag-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
