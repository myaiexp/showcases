// echarts example: One dataset feeding hundreds of series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One dataset feeding hundreds of series',
  summary:
    'The 5.2 high-dimension case: a dataset with many columns and one line series per column, which stopped being slow once series shared the dataset storage. Slide the series count up and read how long setOption took.',
  section: "What's New in 5",
  tags: ['dataset.source', 'series.encode', 'high-dimensional data', 'setOption', 'line'],
  docs: ['repo/contents/en/basics/release-note/5-2-0.md', 'repo/contents/en/concepts/dataset.md', 'repo/en/option/partial/encode-dimensions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
