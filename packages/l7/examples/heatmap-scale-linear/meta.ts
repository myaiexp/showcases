// l7 example: Heatmap: scale linear on aggregated counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: scale linear on aggregated counts",
  summary:
    "type 'linear' with a fixed domain [1, 6] stretches the palette over that range of cell counts: busier cells all take the last colour.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","scale","IScaleConfig","linear","color"],
  docs: ["repo/site/docs/api/heatmap_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/tutorial/heatmap/grid.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
