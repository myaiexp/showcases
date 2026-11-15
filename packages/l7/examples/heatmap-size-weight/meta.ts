// l7 example: size(field, [0, 1]): point weights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field, [0, 1]): point weights",
  summary:
    "On a classic heat map size() is a weight, not a length: map a field into [0, 1] and heavier points glow hotter. With a plain size(1) every point counts the same.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","size","weight","mag"],
  docs: ["repo/site/docs/tutorial/heatmap/normal.en.md","repo/site/docs/api/heatmap_layer/heatmap.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
