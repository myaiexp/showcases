// observable-plot example: Intervals: numeric interval as bin width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: numeric interval as bin width',
  summary:
    'binX with a number as interval makes bins at consecutive multiples of it; the athlete weight histogram changes from 2 kg to 40 kg bins.',
  section: 'Intervals',
  tags: ['binX', 'rectY', 'interval'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/features/intervals.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
