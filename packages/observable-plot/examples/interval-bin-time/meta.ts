// observable-plot example: Intervals: time interval as bin width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: time interval as bin width',
  summary:
    'binX with a time interval bins Apple daily volume into weeks, months, quarters or years, summing the volume of each.',
  section: 'Intervals',
  tags: ['binX', 'rectY', 'interval'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/features/intervals.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
