// Chart.js example: Time series: one slot per data point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time series: one slot per data point",
  summary:
    "A time axis leaves a gap where days are missing; a timeseries axis gives every data point an equal slot, which suits stock prices that skip weekends.",
  section: 'Axes',
  tags: ['type','timeseries','time','ticks.source'],
  docs: ['repo/docs/axes/cartesian/timeseries.md','repo/docs/axes/cartesian/time.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
