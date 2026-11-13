// echarts example: Scatter on a category axis as a strip plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter on a category axis as a strip plot',
  summary:
    'The handbook basic scatter with a category axis and a value axis: several readings per weekday as [category, value] pairs, sized by a callback. Flip the category axis between the x and y side and toggle boundaryGap and the category split lines.',
  section: 'Scatter',
  tags: ['scatter', 'xAxis.type category', 'yAxis.type category', 'boundaryGap', 'splitLine', 'symbolSize', 'data'],
  docs: [
    'repo/contents/en/how-to/chart-types/scatter/basic-scatter.md',
    'repo/en/option/series/scatter.md',
    'repo/en/option/partial/symbol.md',
    'repo/contents/en/concepts/axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
