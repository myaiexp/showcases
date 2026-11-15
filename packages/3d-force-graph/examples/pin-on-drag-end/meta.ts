// 3d-force-graph example: Interaction: pin nodes after dragging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: pin nodes after dragging",
  summary:
    "onNodeDragEnd sets fx, fy and fz on the dropped node, so it stays where it was released instead of being pulled back by the forces. Pinned nodes turn orange; a button frees them.",
  section: "Interaction",
  tags: ['onNodeDragEnd', 'nodeColor', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
