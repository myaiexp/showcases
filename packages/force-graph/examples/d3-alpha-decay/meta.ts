// force-graph example: Force engine: d3AlphaDecay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: d3AlphaDecay',
  summary:
    'd3AlphaDecay is how fast the simulation cools. Scrambled graphs reheated together show a fast decay freezing early while a slow decay keeps working the nodes; the captions give the estimated alpha.',
  section: 'Force engine configuration',
  tags: ['d3AlphaDecay', 'd3ReheatSimulation', 'onEngineTick'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
