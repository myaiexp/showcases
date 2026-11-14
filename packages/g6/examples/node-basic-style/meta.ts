// g6 example: Node style: fill, stroke, lineWidth, size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: fill, stroke, lineWidth, size",
  summary:
    "Circle, rect and star nodes share one style object; a control changes fill, stroke, lineWidth or size and setNode plus draw repaints them.",
  section: 'Node',
  tags: ['node.style', 'fill', 'stroke', 'lineWidth', 'size', 'setNode'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md', 'repo/packages/site/docs/manual/element/node/overview.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
