// echarts example: Gauge axisLabel rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gauge axisLabel rotation',
  summary:
    'A grade dial whose tick labels are letters. Switch axisLabel.rotate between tangential, radial and fixed angles and move the labels in or out with distance.',
  section: 'Option: series.gauge',
  tags: ['gauge', 'axisLabel', 'rotate', 'distance', 'formatter', 'axisLine.lineStyle.color'],
  docs: [
    'repo/en/option/series/gauge.md',
    'repo/en/option/partial/label-rotate-tangential.md',
    'repo/contents/en/basics/release-note/5-4-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
