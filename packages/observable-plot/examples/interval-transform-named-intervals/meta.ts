// observable-plot example: Interval transform: day, week or month
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interval transform: day, week or month',
  summary:
    'The interval option on rectY turns each date into an extent of the named interval, so the same daily volumes draw as day, week or month wide bars.',
  section: 'Transform: Interval',
  tags: ['rectY', 'interval', 'day', 'week', 'month'],
  docs: ['repo/docs/transforms/interval.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
