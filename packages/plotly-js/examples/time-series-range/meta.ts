// plotly-js example: Time series with custom range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time series with custom range',
  summary:
    'The Apple price lines opened on a chosen date range through xaxis.range, with a select of other ranges.',
  section: 'Time Series',
  tags: ['scatter', 'xaxis.range', 'yaxis.autorange', 'relayout'],
  docs: ['repo/_posts/plotly_js/financial/time-series/2017-08-14-time-series-range.html', 'repo/finance-charts-apple.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
