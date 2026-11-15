// 3d-force-graph example: Force engine: dagNodeFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: dagNodeFilter",
  summary:
    "dagNodeFilter returns false for nodes to leave out of the DAG layout; they stay unconstrained and drift under the other forces. The select picks which level is excluded (grey nodes).",
  section: "Force engine configuration",
  tags: ['dagNodeFilter', 'dagMode', 'dagLevelDistance', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
