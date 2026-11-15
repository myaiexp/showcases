// 3d-force-graph example: Interaction: onNodeRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onNodeRightClick",
  summary:
    "onNodeRightClick pins a node by setting fx, fy and fz to where it is, and frees it on the next right-click. Pinned nodes stay put while the rest are scrambled and settle again.",
  section: "Interaction",
  tags: ['onNodeRightClick', 'd3ReheatSimulation', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
