// observable-plot example: Rule: candlestick chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rule: candlestick chart',
  summary:
    'Two ruleX marks per trading day: a thin one from low to high, and a thick one from open to close coloured red or green by a threshold scale.',
  section: 'Mark: Rule',
  tags: ['ruleX', 'y1', 'y2', 'threshold', 'strokeWidth'],
  docs: ['repo/docs/marks/rule.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
