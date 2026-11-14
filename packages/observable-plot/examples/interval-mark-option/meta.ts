// observable-plot example: Intervals: interval option on a rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: interval option on a rect',
  summary:
    'rectY with an interval option turns each date into an extent, so rects widen from a day to a week or month and those in one interval stack.',
  section: 'Intervals',
  tags: ['rectY', 'interval', 'stack'],
  docs: ['repo/docs/transforms/interval.md', 'repo/docs/features/intervals.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
