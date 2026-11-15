// 3d-force-graph example: Force engine: d3AlphaDecay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: d3AlphaDecay",
  summary:
    "d3AlphaDecay is the share of the simulation's alpha lost every tick. Three copies of one scrambled graph cool at different rates, with a tick and alpha readout in each pane.",
  section: "Force engine configuration",
  tags: ['d3AlphaDecay', 'd3ReheatSimulation', 'warmupTicks'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
