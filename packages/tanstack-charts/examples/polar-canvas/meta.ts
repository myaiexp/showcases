// tanstack-charts example: Canvas renderer for a radial mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas renderer for a radial mark",
  summary:
    "Every radial mark accepts a renderer option. Painting 1500 radialDot marks with canvasChartRenderer puts them on one canvas, while the grid guides and labels stay SVG; the checkbox switches back to SVG circles. Setting the renderer on polar() itself would move the whole container.",
  section: "Polar Marks",
  tags: ['polar', 'radialDot', 'renderer', 'canvasChartRenderer'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
