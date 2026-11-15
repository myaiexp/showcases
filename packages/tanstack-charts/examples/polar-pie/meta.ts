// tanstack-charts example: Pie chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie chart",
  summary:
    "The pie transform turns six budget rows into angle intervals (startAngle, endAngle, fraction) without drawing anything, and radialArc paints each one inside a polar container. Scales are null because the arcs carry their own geometry.",
  section: "Polar Marks",
  tags: ['tooltip format', 'pie', 'polar', 'radialArc', 'key', 'color', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
