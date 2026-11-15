// force-graph example: Force engine: the charge force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: the charge force',
  summary:
    'd3Force(\'charge\') is the many-body force that pushes nodes apart. Its strength() takes a negative number for repulsion; changing it and calling d3ReheatSimulation shows the layout expanding or collapsing.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'd3ReheatSimulation', 'forceManyBody'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
