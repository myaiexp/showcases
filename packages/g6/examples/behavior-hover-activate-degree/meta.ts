// g6 example: Hover activate: degree and direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover activate: degree and direction',
  summary: 'degree spreads the active state to neighbours some hops away; direction limits it to outgoing edges, incoming edges or both. The card hovers one node under several settings.',
  section: 'Behavior',
  tags: ['hover-activate', 'degree', 'direction'],
  docs: ['repo/packages/site/docs/manual/behavior/HoverActivate.en.md', 'repo/packages/site/common/api/behaviors/hover-activate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
