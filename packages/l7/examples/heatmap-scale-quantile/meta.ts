// l7 example: Heatmap: scale quantile on aggregated counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: scale quantile on aggregated counts",
  summary:
    "type 'quantile' gives every colour the same number of cells, however lopsided the counts.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","scale","IScaleConfig","quantile","color"],
  docs: ["repo/site/docs/api/heatmap_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
