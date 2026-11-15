// globe-gl example: Heatmaps: color function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: color function",
  summary:
    "heatmapColorFn returns an interpolator from density (0 to 1) to a CSS colour. A select swaps between a fire ramp, an ice ramp and a three-step banded palette.",
  section: "Heatmaps Layer",
  tags: ["heatmapColorFn", "heatmapBandwidth"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
