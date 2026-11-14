// g6 example: Hover activate: enable function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover activate: enable function',
  summary: 'enable takes a function of the event, here allowing hover on nodes only, edges only or both by event.targetType. The card hovers a node and then an edge under each rule.',
  section: 'Behavior',
  tags: ['hover-activate', 'enable', 'targetType'],
  docs: ['repo/packages/site/docs/manual/behavior/HoverActivate.en.md', 'repo/packages/site/common/api/behaviors/hover-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
