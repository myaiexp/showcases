// echarts example: Global blendMode lighter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Global blendMode lighter',
  summary:
    'Three overlapping point clouds drawn with the default source-over or the lighter compositing mode, where dense areas add up to bright white. Set blendMode on the whole chart or on each series, and move the clusters closer or further apart.',
  section: 'Option: global',
  tags: ['blendMode', 'scatter', 'itemStyle.opacity', 'symbolSize'],
  docs: ['repo/en/option/option.md', 'repo/en/option/series/scatter.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
