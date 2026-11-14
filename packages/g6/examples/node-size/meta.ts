// g6 example: Node style: size as a number or a pair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: size as a number or a pair",
  summary:
    "A circle, rect, ellipse and diamond share one size value. A toggle switches between a single number and a [width, height] pair.",
  section: 'Node',
  tags: ['size', 'circle', 'rect', 'ellipse', 'diamond', 'setNode'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
