// observable-plot example: Intervals: a custom interval object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: a custom interval object',
  summary:
    'Any object with floor, offset (and range, ceil) works as an interval: bins of n years counted from a chosen origin group the temperature anomalies.',
  section: 'Intervals',
  tags: ['binX', 'rectY', 'interval'],
  docs: ['repo/docs/features/intervals.md', 'repo/docs/transforms/bin.md', 'repo/docs/data/hadcrut.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
