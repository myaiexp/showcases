// l7 example: Heatmap: Layer options name and visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: Layer options name and visible",
  summary:
    "name lets scene.getLayerByName() find a layer; visible: false adds it hidden. The two heat maps below take turns.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","options","name","visible","getLayerByName","show","hide"],
  docs: ["repo/site/docs/api/heatmap_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
