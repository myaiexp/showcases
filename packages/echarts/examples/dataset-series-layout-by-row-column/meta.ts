// echarts example: Dataset rows or columns as series with seriesLayoutBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dataset rows or columns as series with seriesLayoutBy',
  summary:
    'One small table, read two ways. seriesLayoutBy column makes each product column a series over the years; row makes each row a series over the products. Switch between them or show both on two grids.',
  section: 'Data',
  tags: ['dataset.source', 'seriesLayoutBy', 'series.encode', 'xAxisIndex', 'grid'],
  docs: ['repo/contents/en/concepts/dataset.md', 'repo/en/option/component/dataset.md', 'repo/en/option/partial/2d-data.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
