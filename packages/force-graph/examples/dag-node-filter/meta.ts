// force-graph example: Force engine: dagNodeFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: dagNodeFilter',
  summary:
    'dagNodeFilter names the nodes the DAG layout should consider. The ones it rejects, here a whole level, are left unconstrained and drift with the forces while the rest stay in layers.',
  section: 'Force engine configuration',
  tags: ['dagNodeFilter', 'dagMode', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
