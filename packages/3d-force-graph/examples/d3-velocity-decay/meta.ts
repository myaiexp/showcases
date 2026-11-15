// 3d-force-graph example: Force engine: d3VelocityDecay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: d3VelocityDecay",
  summary:
    "d3VelocityDecay is the friction applied to every node's speed each tick. Three copies of one scrambled graph settle with low friction (bouncy), the default and high friction (creeping), with a mean speed readout.",
  section: "Force engine configuration",
  tags: ['d3VelocityDecay', 'd3ReheatSimulation', 'warmupTicks'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
