// l7 example: transforms 'hexagon': honeycomb aggregation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "transforms 'hexagon': honeycomb aggregation",
  summary:
    "A 'hexagon' transform bins the points into honeycomb cells; size is the cell radius in metres. The docs' example draws them as hexagonColumn with a coverage of 0.8.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","source","transforms","hexagon","hexagonColumn","size","coverage"],
  docs: ["repo/site/docs/api/heatmap_layer/shape.en.md","repo/site/docs/api/source/source.en.md","repo/site/docs/tutorial/heatmap/hexagon.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
