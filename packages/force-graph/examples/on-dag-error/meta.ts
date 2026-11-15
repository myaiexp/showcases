// force-graph example: Force engine: onDagError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: onDagError',
  summary:
    'A link back to the root makes the graph cyclic. By default the DAG layout throws; with onDagError set the handler receives the ids of the loop, shown here, and the layering carries on as best it can.',
  section: 'Force engine configuration',
  tags: ['onDagError', 'dagMode', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
