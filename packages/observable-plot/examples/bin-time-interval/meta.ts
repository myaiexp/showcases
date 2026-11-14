// observable-plot example: Bin: temporal bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: temporal bins',
  summary:
    'Apple closing prices binned by calendar interval: thresholds as a time interval (day, week, month, year) with a mean reducer, drawn with rectY.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'interval', 'thresholds', 'mean'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
