// g6 example: Node style: transform and transformOrigin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: transform and transformOrigin",
  summary:
    "Rect, star and triangle nodes rotated and scaled in place with transform (in G's array form, which keeps each node's position), around a transformOrigin that can be moved to a corner.",
  section: 'Node',
  tags: ['transform', 'transformOrigin', 'rotate', 'scale'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
