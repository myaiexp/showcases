// tanstack-charts example: tickX and tickY strip plots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "tickX and tickY strip plots",
  summary:
    "56 observations in four regions drawn as ticks. tickX draws a vertical rule at each point (its length spans the y direction, defaulting to the band width), tickY a horizontal one. Both use z for the series color and key for stable identity.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['tickX', 'tickY', 'z', 'key', 'scaleBand'],
  docs: [
    'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
