// echarts example: Bars on a time axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bars on a time axis',
  summary:
    'A bar series placed by timestamp on a time xAxis. Change the spacing of the data (six-hourly, daily, weekly) and the barWidth to see how bars are sized against real time.',
  section: 'Option: series.bar',
  tags: ['bar', 'xAxis.type', 'time', 'barWidth', 'tooltip.axisPointer'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/component/x-axis.md', 'repo/en/option/component/axis-common.md', 'repo/en/option/partial/barGrid.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
