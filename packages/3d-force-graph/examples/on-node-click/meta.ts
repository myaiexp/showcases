// 3d-force-graph example: Interaction: onNodeClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onNodeClick",
  summary:
    "onNodeClick receives the clicked node and the mouse event. Here it selects the node (red) and a second click clears it; nodeColor reads the selection and is set again to repaint.",
  section: "Interaction",
  tags: ['onNodeClick', 'nodeColor', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
