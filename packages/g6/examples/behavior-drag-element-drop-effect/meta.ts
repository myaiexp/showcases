// g6 example: Drag element: dropEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element: dropEffect',
  summary: 'dropEffect decides what dropping a node on a combo does: move resizes the old parent, link makes the combo the new parent, none only moves the node. The card drags a node into the other combo under each value.',
  section: 'Behavior',
  tags: ['drag-element', 'dropEffect', 'combo', 'link', 'move', 'none'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElement.en.md', 'repo/packages/site/common/api/behaviors/drag-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
