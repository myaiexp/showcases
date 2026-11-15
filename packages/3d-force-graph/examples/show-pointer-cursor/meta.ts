// 3d-force-graph example: Interaction: showPointerCursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: showPointerCursor",
  summary:
    "showPointerCursor takes a function of the hovered object that returns whether the hand cursor shows. Only the nodes of team 1 get the hand; the readout reads the canvas's clickable class.",
  section: "Interaction",
  tags: ['showPointerCursor', 'onNodeClick', 'onNodeHover', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
