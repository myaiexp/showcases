// g6 example: Node style: dashed borders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: dashed borders",
  summary:
    "Three nodes with a dashed stroke. lineDash, lineCap, lineJoin and lineWidth can be changed in the full view; the card steps lineDashOffset so the dashes march.",
  section: 'Node',
  tags: ['lineDash', 'lineDashOffset', 'lineCap', 'lineJoin', 'lineWidth'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
