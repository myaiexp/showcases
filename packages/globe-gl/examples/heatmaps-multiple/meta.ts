// globe-gl example: Heatmaps: several datasets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: several datasets",
  summary:
    "heatmapsData with two objects, one for the Americas and one for the rest of the world, each carrying its own points, bandwidth and colour function that the accessors read from the datum.",
  section: "Heatmaps Layer",
  tags: ["heatmapsData", "heatmapPoints", "heatmapBandwidth", "heatmapColorFn"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
