// echarts example: Horizontal bars on a category y axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal bars on a category y axis',
  summary:
    'A ranking drawn as horizontal bars. Toggle yAxis.inverse and sorting, move the label between right and inside positions, and draw new data.',
  section: 'Option: series.bar',
  tags: ['bar', 'yAxis.type', 'yAxis.inverse', 'label.position', 'barWidth', 'itemStyle.borderRadius'],
  docs: [
    'repo/en/option/series/bar.md',
    'repo/en/option/partial/barGrid.md',
    'repo/en/option/component/axis-common.md',
    'repo/en/option/partial/component-common-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
