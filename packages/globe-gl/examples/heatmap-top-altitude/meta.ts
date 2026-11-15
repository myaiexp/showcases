// globe-gl example: Heatmaps: top and base altitude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: top and base altitude",
  summary:
    "heatmapBaseAltitude and heatmapTopAltitude turn density into relief, with height interpolated between the two. Two sliders change them; equal values give a flat heatmap.",
  section: "Heatmaps Layer",
  tags: ["heatmapTopAltitude", "heatmapBaseAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
