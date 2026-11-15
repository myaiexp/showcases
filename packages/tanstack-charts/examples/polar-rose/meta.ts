// tanstack-charts example: Rose chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rose chart",
  summary:
    "radialBarRadius transposes a bar chart across polar axes: months go on a band angle scale and rainfall on a square-root radius scale. The band scale's paddingInner sets the gap between wedges, radialGrid and angleGrid draw the rings and spokes.",
  section: "Polar Marks",
  tags: ['tooltip format', 'radialBarRadius', 'polar', 'scaleBand', 'scaleSqrt', 'radialGrid', 'angleGrid', 'cornerRadius'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
