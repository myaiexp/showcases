// tanstack-charts example: Leader lines with radialRule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leader lines with radialRule",
  summary:
    "radialRule draws one segment per row between radius1 and radius2. Both radii sit on the outer edge, and radius1Offset and radius2Offset push the ends outward by pixels to make leader lines, with radialText labels at their tips. Offsets never change the radius domain.",
  section: "Polar Marks",
  tags: ['radialRule', 'radius1Offset', 'radius2Offset', 'radialText', 'radialArc', 'pie'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
