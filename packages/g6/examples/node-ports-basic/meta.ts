// g6 example: Node ports: four directional ports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node ports: four directional ports",
  summary:
    "Circle, rect and diamond nodes with ports on all four sides, each port filled differently. portR and portLineWidth change the look, and port switches them off.",
  section: 'Node',
  tags: ['port', 'ports', 'portR', 'portLineWidth', 'portStroke', 'placement'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
