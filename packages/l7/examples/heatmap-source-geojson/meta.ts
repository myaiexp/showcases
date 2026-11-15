// l7 example: Heatmap: source: GeoJSON points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: source: GeoJSON points",
  summary:
    "GeoJSON needs no parser: L7 reads the coordinates of each Point feature and its properties.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","source","GeoJSON"],
  docs: ["repo/site/docs/api/heatmap_layer/source.en.md","repo/site/docs/api/common/layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
