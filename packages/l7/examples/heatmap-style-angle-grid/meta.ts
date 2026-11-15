// l7 example: style angle on a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style angle on a grid",
  summary:
    "angle rotates each grid cell about its centre (the docs list 0 to 360; the shader treats it as radians, so 0 to 6.3 is a full turn).",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","style","angle","square"],
  docs: ["repo/site/docs/api/heatmap_layer/style.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
