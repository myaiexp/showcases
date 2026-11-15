// tanstack-charts example: Pie ordering, sweep and gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie ordering, sweep and gaps",
  summary:
    "The pie transform options: orderBy and order sort the angular order without reordering the rows, startAngle and endAngle limit the sweep (here centered on twelve o'clock), and gapAngle leaves a radius-independent gap between slices.",
  section: "Polar Marks",
  tags: ['pie', 'orderBy', 'order', 'startAngle', 'endAngle', 'gapAngle', 'innerRadius'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
