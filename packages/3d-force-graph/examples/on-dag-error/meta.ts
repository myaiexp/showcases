// 3d-force-graph example: Force engine: onDagError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: onDagError",
  summary:
    "A DAG layout on data with a cycle throws unless onDagError handles it. The callback receives the node ids of the loop, which are then highlighted, while the layout carries on best-effort.",
  section: "Force engine configuration",
  tags: ['onDagError', 'dagMode', 'nodeColor', 'linkColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
