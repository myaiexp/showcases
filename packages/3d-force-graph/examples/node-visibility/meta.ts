// 3d-force-graph example: Node styling: nodeVisibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeVisibility',
  summary:
    'nodeVisibility hides the nodes for which it returns false, by attribute or function. Hidden nodes keep no sphere, so the links that touch them are hidden with linkVisibility to match. Toggle a team or watch the card step through them.',
  section: 'Node styling',
  tags: ['nodeVisibility', 'linkVisibility'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
