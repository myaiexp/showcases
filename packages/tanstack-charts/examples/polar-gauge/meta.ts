// tanstack-charts example: Gauge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge",
  summary:
    "A donut-style arc over a half-circle sweep: one arc for the track, one for the value, a radialRule as the needle and a radialText readout. The polar angle scale maps 0 to 100 onto the sweep, so the needle and the text use the raw value.",
  section: "Polar Marks",
  tags: ['polar', 'radialArc', 'radialRule', 'radialText', 'startAngle', 'endAngle', 'radiusRatio'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
