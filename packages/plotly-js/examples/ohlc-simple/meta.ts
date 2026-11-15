// plotly-js example: Simple OHLC chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simple OHLC chart',
  summary:
    'Three weeks of Apple prices as OHLC bars with a rangeslider; line width is adjustable.',
  section: 'OHLC Charts',
  tags: ['ohlc', 'line.width', 'xaxis.rangeslider'],
  docs: ['repo/_posts/plotly_js/financial/ohlc/2015-08-21-simple-ohlc-chart.html', 'repo/finance-charts-apple.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
