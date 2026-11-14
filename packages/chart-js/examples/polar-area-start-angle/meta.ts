// Chart.js example: Rotating a polar area chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rotating a polar area chart",
  summary:
    "scales.r.startAngle (in degrees) rotates the whole polar area chart, so you can choose which slice points up. Angle lines can be switched off.",
  section: 'Chart types',
  tags: ['startAngle','angleLines','polarArea','scales.r'],
  docs: ['repo/docs/charts/polar.md', 'repo/docs/axes/radial/linear.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
