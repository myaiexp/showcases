// tanstack-charts example: A hand-written ChartCurve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A hand-written ChartCurve",
  summary:
    "A ChartCurve is two functions that return SVG path data. This one rounds every corner by passing through segment midpoints with quadratic curves, and it is used by both a line and an area. No d3 module is involved.",
  section: "Custom Extensions",
  tags: ['ChartCurve', 'lineY', 'areaY', 'curve'],
  docs: ['repo/docs/reference/custom-extensions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
