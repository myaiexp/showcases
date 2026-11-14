// echarts example: Basic line chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basic line chart',
  summary:
    'One line series drawn on a category axis, then on a value axis with [x, y] pairs. Change the symbol and line width, or let connectNulls bridge the missing point.',
  section: 'Line',
  tags: ['line', 'symbol', 'symbolSize', 'lineStyle', 'connectNulls', 'category', 'value'],
  docs: [
    'repo/contents/en/how-to/chart-types/line/basic-line.md',
    'repo/en/option/series/line.md',
    'repo/en/option/partial/symbol.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
