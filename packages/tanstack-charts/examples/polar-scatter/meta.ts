// tanstack-charts example: Polar scatter with sized dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polar scatter with sized dots",
  summary:
    "70 observations as radialDot marks. angle is a bearing in degrees on a linear 0 to 360 scale, radius a distance, and r reads a mass field through a square-root rScale so area follows mass. angleGrid shows four labelled spokes.",
  section: "Polar Marks",
  tags: ['radialDot', 'r', 'rScale', 'polar', 'angleGrid', 'radialGrid', 'scaleSqrt'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
