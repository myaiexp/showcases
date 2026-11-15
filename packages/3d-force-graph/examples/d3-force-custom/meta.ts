// 3d-force-graph example: Force engine: a custom force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: a custom force",
  summary:
    "d3Force('anchor', fn) adds a hand-written force: a function of alpha with an initialize(nodes) method. This one pulls every group towards its own anchor point in x, y and z; passing null removes it.",
  section: "Force engine configuration",
  tags: ['d3Force', 'd3ReheatSimulation', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
