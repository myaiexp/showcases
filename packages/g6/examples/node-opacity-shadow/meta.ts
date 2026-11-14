// g6 example: Node style: fill opacity and shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node style: fill opacity and shadow",
  summary:
    "A circle and a rect with a coloured shadow. Sliders change fillOpacity, shadowBlur and the shadow offsets, and a select switches shadowType between outer and inner.",
  section: 'Node',
  tags: ['fillOpacity', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowType'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
