// globe-gl example: Heatmaps: bandwidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: bandwidth",
  summary:
    "heatmapBandwidth, in angular degrees, sets how far each point's influence reaches: narrow gives spikes, broad smooth hills. A slider changes it (the density is recomputed on the CPU each time).",
  section: "Heatmaps Layer",
  tags: ["heatmapBandwidth", "heatmapsTransitionDuration"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
