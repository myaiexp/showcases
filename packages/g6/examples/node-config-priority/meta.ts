// g6 example: Node config priority: setNode, global style, data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node config priority: setNode, global style, data",
  summary:
    "Three nodes: one with only global style, two with their own stroke. A global stroke callback keeps the data stroke, and setNode overrides the fill for all.",
  section: 'Node',
  tags: ['setNode', 'node.style', 'priority', 'callback'],
  docs: ['repo/packages/site/docs/manual/element/node/overview.en.md', 'repo/packages/site/docs/manual/element/node/BaseNode.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
