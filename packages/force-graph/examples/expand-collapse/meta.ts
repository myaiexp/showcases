// force-graph example: Interaction: expand and collapse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: expand and collapse',
  summary:
    'Clicking a node that has children folds its whole subtree into it by setting graphData with those nodes and links filtered out; a second click brings them back. Folded nodes turn orange and say how many they hide.',
  section: 'Interaction',
  tags: ['onNodeClick', 'graphData', 'nodeColor', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
