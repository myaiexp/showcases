// plotly-js example: Ticks: date ticks every 30 days
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ticks: date ticks every 30 days',
  summary: 'A year of monthly readings on a date axis with a tick every dtick milliseconds from a start date; a select changes the step, including the M1 month steps.',
  section: 'Formatting Ticks',
  tags: ['xaxis.tick0', 'xaxis.dtick', 'xaxis.tickmode', 'date'],
  docs: ['repo/_posts/plotly_js/fundamentals/tick-format/2018-12-17-linear(date)-tickmode.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
