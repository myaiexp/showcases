// l7 example: Heatmap: Layer option autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: Layer option autoFit",
  summary:
    "autoFit: true zooms the map to the layer's extent after it initialises. Jump away, then add the layer again.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","options","autoFit"],
  docs: ["repo/site/docs/api/heatmap_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
