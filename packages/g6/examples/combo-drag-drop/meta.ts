// g6 example: Combo drag and drop effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Combo drag and drop effects',
  summary:
    'drag-element dropEffect link, move or none decides what dropping a node on a combo does; the card re-parents a node through its data.',
  section: 'Combo',
  tags: ['drag-element', 'dropEffect', 'setBehaviors', 'updateNodeData'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/overview.en.md',
    'repo/packages/site/docs/manual/behavior/DragElement.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
