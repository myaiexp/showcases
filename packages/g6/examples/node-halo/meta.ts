// g6 example: Node halo: width, colour, opacity and dash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node halo: width, colour, opacity and dash",
  summary:
    "Circle, rect and star nodes with a halo ring. Controls change haloStroke, haloLineWidth, haloStrokeOpacity and a dashed halo; the card pulses the width.",
  section: 'Node',
  tags: ['halo', 'haloStroke', 'haloLineWidth', 'haloStrokeOpacity', 'haloLineDash'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
