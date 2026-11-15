// globe-gl example: Heatmaps: color saturation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: color saturation",
  summary:
    "heatmapColorSaturation multiplies the normalised density before colouring: low values keep colour for the peaks only, high values bring the faint floor into view. A slider changes it.",
  section: "Heatmaps Layer",
  tags: ["heatmapColorSaturation", "heatmapsTransitionDuration"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
