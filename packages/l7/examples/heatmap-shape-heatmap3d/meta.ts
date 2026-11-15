// l7 example: shape('heatmap3D'): heat surface in 3D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('heatmap3D'): heat surface in 3D",
  summary:
    "shape('heatmap3D') draws the same density as hills whose height follows the intensity. Tilt the map to see them.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","shape","heatmap3D","size","rampColors"],
  docs: ["repo/site/docs/api/heatmap_layer/shape.en.md","repo/site/docs/api/heatmap_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
