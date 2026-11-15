// l7 example: transforms 'grid': square aggregation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "transforms 'grid': square aggregation",
  summary:
    "A 'grid' transform bins the points into squares; size is the cell radius in metres. Bigger cells smooth the picture, smaller ones follow the points.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","source","transforms","grid","size","field","method"],
  docs: ["repo/site/docs/api/heatmap_layer/shape.en.md","repo/site/docs/api/source/source.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
