// echarts example: Image and path symbols with symbolKeepAspect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image and path symbols with symbolKeepAspect',
  summary:
    'Scatter points drawn as image:// data URIs and as path:// vector shapes. Change the symbolSize box to a wide rectangle and toggle symbolKeepAspect to see the path keep its proportions or stretch to fill the box.',
  section: 'Scatter',
  tags: ['symbol', 'image://', 'path://', 'symbolKeepAspect', 'symbolSize', 'dataURI'],
  docs: [
    'repo/contents/en/how-to/chart-types/scatter/basic-scatter.md',
    'repo/en/option/partial/icon.md',
    'repo/en/option/partial/symbol.md',
    'repo/en/option/series/scatter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
