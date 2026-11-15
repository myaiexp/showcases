// l7 example: style coverage on a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style coverage on a grid",
  summary:
    "coverage (0 to 1, default 1) is how much of each grid cell is drawn: below 1 the squares shrink and leave gaps.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","style","coverage","square"],
  docs: ["repo/site/docs/api/heatmap_layer/style.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
