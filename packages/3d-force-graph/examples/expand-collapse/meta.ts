// 3d-force-graph example: Interaction: expand and collapse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: expand and collapse",
  summary:
    "Clicking a node with children collapses its subtree into it (orange and bigger, with the hidden count in its label) or expands it again, by setting graphData with only the visible nodes and links.",
  section: "Interaction",
  tags: ['onNodeClick', 'graphData', 'nodeVal', 'nodeColor', 'nodeLabel', 'onEngineStop'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
