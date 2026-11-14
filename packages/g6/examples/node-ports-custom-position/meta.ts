// g6 example: Node ports: placement by ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node ports: placement by ratio",
  summary:
    "Ports positioned with [x, y] ratios of the node box rather than a side name; a slider moves the top and bottom ports along the edge.",
  section: 'Node',
  tags: ['ports', 'placement', 'portR'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
