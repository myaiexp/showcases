// Perspective example: Candlestick and OHLC charts on a streaming tick table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick and OHLC',
  summary: 'Ticks stream into one table. Four expression columns over the price, aggregated with first, last by index, max and min under a bucket()ed time group_by, become the Open, Close, High and Low of each candle.',
  section: 'Charts',
  tags: ['Candlestick', 'OHLC', 'WebGL', 'streaming', 'aggregates', 'bucket', 'expressions'],
  docs: ['repo/packages/viewer-charts/README.md', 'repo/docs/md/how_to/javascript/viewer.md', 'repo/docs/md/explanation/view/config/grouping_and_pivots.md', 'repo/docs/md/explanation/view/config/expressions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
