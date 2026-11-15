// tanstack-charts example: Two-series radar with angle focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two-series radar with angle focus",
  summary:
    "Two players on the same six axes. focusGroupAngle replaces nearest-point focus: the pointer picks the closest spoke by angle and the tooltip lists one row per player at that angle, with the closest radius as primary.",
  section: "Polar Marks",
  tags: ['polar', 'focusGroupAngle', 'radialArea', 'radialDot', 'z', 'defineChart'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
