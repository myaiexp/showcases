// tanstack-charts example: Radial text and outside anchors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial text and outside anchors",
  summary:
    "Twelve clock numerals placed by angle on a ring. anchor 'outside' chooses start, middle or end from each label's angle, so numerals at the top and bottom stay centered. radiusOffset is a signed pixel offset applied after the radius is mapped, and it can also rotate labels.",
  section: "Polar Marks",
  tags: ['radialText', 'anchor outside', 'radiusOffset', 'rotate', 'radialDot'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
