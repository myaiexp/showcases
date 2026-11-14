// echarts example: Dataset dimensions, types and sourceHeader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dataset dimensions, types and sourceHeader',
  summary:
    'The same sales figures supplied six ways: a 2D array with a header row, with sourceHeader forced true, without a header and named by dataset.dimensions, as an array of objects, as a column-keyed object, and with a time-typed dimension. The option behind each chart is printed beside it.',
  section: 'Data',
  tags: ['dataset.source', 'dataset.dimensions', 'sourceHeader', 'dimension type', 'ordinal', 'time', 'series.dimensions'],
  docs: ['repo/contents/en/concepts/dataset.md', 'repo/en/option/component/dataset.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
