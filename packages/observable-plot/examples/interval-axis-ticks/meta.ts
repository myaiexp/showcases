// observable-plot example: Intervals: interval as scale ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: interval as scale ticks',
  summary:
    'An interval as the x scale ticks option puts axis ticks and grid lines on weeks, months, mondays or years instead of an approximate count.',
  section: 'Intervals',
  tags: ['ticks', 'interval', 'lineY'],
  docs: ['repo/docs/features/intervals.md', 'repo/docs/features/scales.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
