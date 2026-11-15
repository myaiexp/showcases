// globe-gl example: Heatmaps: points and defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: points and defaults",
  summary:
    "heatmapsData given one heatmap that is a plain list of [lat, lng] pairs, drawn with every default: about 200 points scattered around big cities, Gaussian density, Turbo-like colours. A button re-rolls the points.",
  section: "Heatmaps Layer",
  tags: ["heatmapsData", "heatmapPoints", "heatmapPointLat", "heatmapPointLng"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
