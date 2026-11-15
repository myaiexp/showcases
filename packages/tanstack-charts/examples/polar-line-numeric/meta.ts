// tanstack-charts example: Numeric polar line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Numeric polar line",
  summary:
    "radialLine with numeric angle and radius channels draws a curve from a function. Angles are radians on a linear angle scale, radius is 0 to 1, and a d3 curve factory switches between a smooth and a straight-segment path.",
  section: "Polar Marks",
  tags: ['radialLine', 'curve', 'polar', 'scaleLinear', 'curveBasis'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
