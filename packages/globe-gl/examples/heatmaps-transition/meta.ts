// globe-gl example: Heatmaps: transition duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: transition duration",
  summary:
    "When a dataset's points are replaced, heatmapsTransitionDuration morphs the colours and heights from the old density to the new one. Points are re-rolled every five seconds; a slider sets the duration.",
  section: "Heatmaps Layer",
  tags: ["heatmapsTransitionDuration", "heatmapTopAltitude", "heatmapPoints"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
