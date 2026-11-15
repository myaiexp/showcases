// 3d-force-graph example: Force engine: the link force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: the link force",
  summary:
    "d3Force('link') returns the link force. Its distance takes a function, here each link's value times a slider, so heavier links settle longer; linkWidth shows the value.",
  section: "Force engine configuration",
  tags: ['d3Force', 'd3ReheatSimulation', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
