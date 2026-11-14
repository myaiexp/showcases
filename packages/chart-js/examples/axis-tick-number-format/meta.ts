// Chart.js example: Number formatting for ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Number formatting for ticks",
  summary:
    "ticks.format hands Intl.NumberFormat options to the default tick formatter, so currency, percent, compact numbers and units need no callback.",
  section: 'Axes',
  tags: ['ticks.format','Intl.NumberFormat','linear'],
  docs: ['repo/docs/axes/cartesian/linear.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
