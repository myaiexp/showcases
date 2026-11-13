// echarts example: Scatter symbols and sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter symbols and sizes',
  summary:
    'Three scatter clusters on two value axes. Switch the symbol between the built-in shapes and an SVG path, and size the points with a fixed number or with a function of the third data value.',
  section: 'Scatter',
  tags: ['scatter', 'symbol', 'symbolSize', 'path://', 'itemStyle.opacity'],
  docs: ['repo/contents/en/how-to/chart-types/scatter/basic-scatter.md', 'repo/en/option/series/scatter.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
