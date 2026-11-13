// echarts example: Two value axes with aligned ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two value axes with aligned ticks',
  summary:
    'Monthly rainfall bars on the left axis and temperature on a right axis. Toggle alignTicks and the second axis snaps its grid to the first; change splitNumber or shift the temperature range to see it recompute.',
  section: 'Option: Components',
  tags: ['yAxis', 'alignTicks', 'splitNumber', 'yAxisIndex', 'axisLine', 'axisLabel.formatter', 'splitLine'],
  docs: [
    'repo/en/option/component/y-axis.md',
    'repo/en/option/component/axis-common.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
    'repo/contents/en/concepts/axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
