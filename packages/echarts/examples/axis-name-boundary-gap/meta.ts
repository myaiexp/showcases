// echarts example: Axis names and boundaryGap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis names and boundaryGap',
  summary:
    'A line chart whose axis titles you can move with nameLocation, nameGap, nameRotate and nameTruncate. The category boundaryGap shifts points between ticks and bands, and the value axis boundaryGap pads the range in percent.',
  section: 'Option: Components',
  tags: ['name', 'nameLocation', 'nameGap', 'nameRotate', 'nameTruncate', 'nameTextStyle', 'boundaryGap', 'xAxis', 'yAxis'],
  docs: ['repo/en/option/component/axis-common.md', 'repo/en/option/component/x-axis.md', 'repo/en/option/component/y-axis.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
