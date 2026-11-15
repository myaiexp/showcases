// tanstack-charts example: Signed radial bars and radius1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Signed radial bars and radius1",
  summary:
    "With no radius1 a radial bar starts at the physical center, which suits nonnegative magnitudes. For signed values radius1: 0 maps both ends through the scale, so gains grow outward from the zero ring and losses inward. The radius range keeps an open center.",
  section: "Polar Marks",
  tags: ['radialBarRadius', 'radius1', 'range', 'radialGrid', 'values'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
