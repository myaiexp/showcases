// observable-plot example: Bollinger: under a candlestick chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bollinger: under a candlestick chart',
  summary:
    'A bollinger band with no line, beneath two ruleX marks forming a candlestick chart, highlights the volatile days; clip keeps marks in the domain.',
  section: 'Mark: Bollinger',
  tags: ['bollingerY', 'ruleX', 'clip', 'stroke'],
  docs: ['repo/docs/marks/bollinger.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
