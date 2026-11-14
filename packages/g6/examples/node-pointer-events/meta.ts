// g6 example: Node style: pointerEvents and cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: pointerEvents and cursor",
  summary:
    "Three nodes with pointerEvents auto, stroke and none, each with its own cursor. In the full view a click selects a node unless its pointerEvents ignores that part; the card simulates the clicks.",
  section: 'Node',
  tags: ['pointerEvents', 'cursor', 'node:click', 'state'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
