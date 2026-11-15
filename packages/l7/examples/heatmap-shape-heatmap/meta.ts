// l7 example: shape('heatmap'): classic heat map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('heatmap'): classic heat map",
  summary:
    "shape('heatmap') blends nearby points into a smooth density surface; size('mag', [0, 1]) is each point's weight and rampColors colours the result.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","shape","heatmap","size","rampColors"],
  docs: ["repo/site/docs/api/heatmap_layer/heatmap.en.md","repo/site/docs/api/heatmap_layer/shape.en.md","repo/site/docs/api/heatmap_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
