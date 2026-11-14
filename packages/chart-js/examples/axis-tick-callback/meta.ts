// Chart.js example: Custom tick labels: money, percent, units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom tick labels: money, percent, units",
  summary:
    "ticks.callback turns a tick value into any text you like: euros, percent, units, shortened numbers, or nothing at all (null hides the grid line too).",
  section: 'Axes',
  tags: ['ticks.callback','getLabelForValue','Ticks.formatters','scales.y'],
  docs: ['repo/docs/axes/labelling.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
