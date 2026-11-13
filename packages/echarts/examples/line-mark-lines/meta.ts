// echarts example: Mark lines and thresholds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark lines and thresholds',
  summary:
    'Reference lines on a daily series: the average with adjustable precision, two fixed yAxis thresholds, a vertical xAxis line, and a segment between two data points. Change the label position and the end symbols.',
  section: 'Option: series.line',
  tags: ['markLine', 'type', 'yAxis', 'xAxis', 'coord', 'symbol', 'precision', 'label.position', 'lineStyle'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/mark-line.md', 'repo/en/option/partial/marker.md', 'repo/en/option/partial/line-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
