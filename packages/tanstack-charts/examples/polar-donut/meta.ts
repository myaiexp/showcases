// tanstack-charts example: Donut with a center label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Donut with a center label",
  summary:
    "A donut is the same arcs with an innerRadius function and a cornerRadius. radialText at radius zero writes the total in the hole. The slider changes the hole size, and the tooltip follows each slice's drawn outline.",
  section: "Polar Marks",
  tags: ['tooltip format', 'radialArc', 'innerRadius', 'cornerRadius', 'radialText', 'pie', 'polar'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
