// tanstack-charts example: Sweep, inset and radius ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sweep, inset and radius ratio",
  summary:
    "The polar container's startAngle and endAngle choose the angular range (zero is twelve o'clock, positive is clockwise), inset removes pixels from the largest centered radius and radiusRatio scales what remains. The same twelve rainfall wedges are laid out in each setting.",
  section: "Polar Marks",
  tags: ['polar', 'startAngle', 'endAngle', 'inset', 'radiusRatio', 'radialBarRadius'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
