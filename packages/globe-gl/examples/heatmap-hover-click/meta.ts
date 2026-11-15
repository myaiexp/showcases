// globe-gl example: Heatmaps: hover and click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: hover and click",
  summary:
    "onHeatmapHover fires as the pointer enters or leaves the heatmap surface, raising its colour saturation while hovered; onHeatmapClick reports the clicked lat and lng and the nearest city.",
  section: "Heatmaps Layer",
  tags: ["onHeatmapHover", "onHeatmapClick", "heatmapColorSaturation"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
