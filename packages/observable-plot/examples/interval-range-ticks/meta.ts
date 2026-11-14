// observable-plot example: Intervals: range boundaries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: range boundaries',
  summary:
    'Plot.utcInterval(period).range(start, stop) lists every boundary in a window; rules show where each period (day, week, quarter, 5 years...) falls.',
  section: 'Intervals',
  tags: ['utcInterval', 'ruleX', 'interval'],
  docs: ['repo/docs/features/intervals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
