// l7 example: style intensity: global weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style intensity: global weight",
  summary:
    "intensity scales every point's weight before blurring: higher values make the hot spots saturate (default 10; the tutorial recommends 1 to 5).",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","style","intensity"],
  docs: ["repo/site/docs/api/heatmap_layer/style.en.md","repo/site/docs/tutorial/heatmap/normal.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
