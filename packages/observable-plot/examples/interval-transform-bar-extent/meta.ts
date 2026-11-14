// observable-plot example: Interval transform: bar extent from a number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interval transform: bar extent from a number',
  summary:
    'On barY a number interval converts a single y value into an interval y1 to y2, so each bar spans that width instead of reaching zero.',
  section: 'Transform: Interval',
  tags: ['barY', 'interval', 'y1', 'y2'],
  docs: ['repo/docs/transforms/interval.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
