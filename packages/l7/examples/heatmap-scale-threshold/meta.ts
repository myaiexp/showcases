// l7 example: Heatmap: scale threshold on aggregated counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: scale threshold on aggregated counts",
  summary:
    "type 'threshold' cuts at your breaks: domain [3, 8] makes three classes of cell count, so the range needs three colours.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","scale","IScaleConfig","threshold","color"],
  docs: ["repo/site/docs/api/heatmap_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
