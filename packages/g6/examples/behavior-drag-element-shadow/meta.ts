// g6 example: Drag element: ghost shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element: ghost shadow',
  summary: 'shadow: true leaves the node in place and moves a ghost with the pointer; shadowFill, shadowStroke and shadowLineDash restyle the ghost. The card drags a node under three ghost looks.',
  section: 'Behavior',
  tags: ['drag-element', 'shadow', 'shadowFill', 'shadowStroke', 'shadowLineDash'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElement.en.md', 'repo/packages/site/common/api/behaviors/drag-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
