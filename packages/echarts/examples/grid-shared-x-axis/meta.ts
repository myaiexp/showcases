// echarts example: Stacked grids sharing one x axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked grids sharing one x axis',
  summary:
    'A price line above a volume bar chart, two grids fed by one dataset. Resize the split, hide or show the upper axis labels, and toggle axisPointer.link to see one hover drive both grids.',
  section: 'Option: Components',
  tags: ['grid', 'gridIndex', 'xAxis', 'yAxis', 'dataset', 'encode', 'axisPointer.link', 'axisLabel.show'],
  docs: [
    'repo/en/option/component/grid.md',
    'repo/en/option/component/x-axis.md',
    'repo/en/option/component/y-axis.md',
    'repo/en/option/component/axis-common.md',
    'repo/en/option/component/axisPointer.md',
    'repo/en/option/partial/rect-layout-width-height.md',
    'repo/contents/en/concepts/axis.md',
    'repo/en/option/partial/encode-dimensions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
