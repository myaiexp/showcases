// Chart.js example: Polar area: equal angles, different reach
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polar area: equal angles, different reach",
  summary:
    "Every slice gets the same angle and the value sets how far it reaches from the centre, so the chart reads like a compass. Good for cyclic categories such as directions or months.",
  section: 'Chart types',
  tags: ['polarArea','radialLinear','scales.r'],
  docs: ['repo/docs/charts/polar.md', 'repo/docs/axes/radial/linear.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
