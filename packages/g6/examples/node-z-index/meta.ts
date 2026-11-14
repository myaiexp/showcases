// g6 example: Node style: zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: zIndex",
  summary:
    "Three overlapping circles drawn in zIndex order. Sliders move each one above or below the others; the card lifts each node to the top in turn.",
  section: 'Node',
  tags: ['zIndex', 'updateNodeData'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
