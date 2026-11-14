// echarts example: Heatmap cell labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap cell labels',
  summary:
    'Heatmap cells with the value written in each. Change label.formatter, fontSize, the cell gap and the column count, and turn labelLayout.hideOverlap on for dense grids.',
  section: 'Option: series.heatmap',
  tags: ['heatmap', 'label', 'formatter', 'labelLayout', 'hideOverlap', 'itemStyle', 'borderRadius'],
  docs: [
    'repo/en/option/series/heatmap.md',
    'repo/en/option/partial/label.md',
    'repo/en/option/partial/label-layout.md',
    'repo/en/option/partial/item-style.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/partial/component-common-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
