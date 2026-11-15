// force-graph example: Force engine: forceX and forceY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: forceX and forceY',
  summary:
    'forceX with a function of the node pulls each group toward its own column, and a weaker forceY centres them vertically. Strength 0 leaves only the links and charge.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'forceX', 'forceY', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
