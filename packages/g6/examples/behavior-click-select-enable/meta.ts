// g6 example: Click select: enable function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: enable function',
  summary: 'enable takes a function of the event: here it allows clicks on nodes only, edges only, or both, by event.targetType. The card clicks a node and an edge under each rule.',
  section: 'Behavior',
  tags: ['click-select', 'enable', 'targetType'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
