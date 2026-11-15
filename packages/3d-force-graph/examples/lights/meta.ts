// 3d-force-graph example: Render control: lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: lights",
  summary:
    "lights([...]) replaces the default ambient and directional lights. Two coloured point lights circle the graph, with a dim ambient and a warm directional light; the ticks take lights in and out of the list.",
  section: "Render control",
  tags: ['lights', 'nodeColor', 'nodeOpacity'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
