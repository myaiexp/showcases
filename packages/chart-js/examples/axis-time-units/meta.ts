// Chart.js example: Time units and date formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time units and date formats",
  summary:
    "time.unit forces the step between ticks (week, month, quarter, year) and time.displayFormats sets how each label reads, so the same data shows as weekly or yearly ticks.",
  section: 'Axes',
  tags: ['time.unit','time.displayFormats','time.tooltipFormat','time'],
  docs: ['repo/docs/axes/cartesian/time.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
