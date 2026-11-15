// vega example: Axis Ticks on Band Scales: tickBand, tickExtra, bandPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis Ticks on Band Scales: tickBand, tickExtra, bandPosition",
  summary:
    "Ticks at band centres, at band edges via tickBand extent, or at the edges by hand with bandPosition and tickExtra; tickOffset nudges ticks and labels together.",
  section: "Axes",
  tags: ["axes.tickBand","axes.tickExtra","axes.bandPosition","axes.tickOffset"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/scales.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
