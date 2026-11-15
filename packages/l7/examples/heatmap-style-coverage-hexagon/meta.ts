// l7 example: style coverage on hexagons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style coverage on hexagons",
  summary:
    "On a hexagon aggregation coverage defaults to 0.9: lower it and the honeycomb breaks into separate cells.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","style","coverage","hexagon"],
  docs: ["repo/site/docs/api/heatmap_layer/style.en.md","repo/site/docs/tutorial/heatmap/hexagon.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
