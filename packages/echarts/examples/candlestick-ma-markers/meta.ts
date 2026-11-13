// echarts example: Candlestick moving averages and markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick moving averages and markers',
  summary:
    'Moving-average lines drawn over a candlestick series, plus markPoint maxima and minima on the high and low dimensions, an average-close markLine and a markArea window. Pick the averages and toggle each marker.',
  section: 'Option: series.candlestick',
  tags: ['candlestick', 'line', 'markPoint', 'markLine', 'markArea', 'valueDim', 'type', 'dataZoom'],
  docs: [
    'repo/en/option/series/candlestick.md',
    'repo/en/option/partial/mark-point.md',
    'repo/en/option/partial/mark-line.md',
    'repo/en/option/partial/mark-area.md',
    'repo/en/option/partial/marker.md',
    'repo/en/option/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
