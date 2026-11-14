// g6 example: Click select: nodes, edges, canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: nodes, edges, canvas',
  summary: 'click-select switches the clicked element to the selected state and clears it on a second click or a canvas click; animation can be turned off. The card clicks a node, an edge and the canvas in turn.',
  section: 'Behavior',
  tags: ['click-select', 'animation', 'state'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
