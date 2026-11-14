// g6 example: Node style as functions of the datum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style as functions of the datum",
  summary:
    "Stroke, lineWidth, fill, labelText and badges are functions of each node's data. Flipping a node's data re-evaluates them.",
  section: 'Node',
  tags: ['node.style', 'callback', 'datum', 'badges', 'updateNodeData'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
