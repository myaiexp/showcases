// echarts example: Filter and sort transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter and sort transforms',
  summary:
    'Declarative data transforms: a dataset pipes two filter transforms and a sort transform, and the bar series reads the result. Change the year, price threshold and sort order.',
  section: 'Concepts',
  tags: ['dataset.transform', 'filter', 'sort', 'datasetIndex', 'encode'],
  docs: [
    'repo/contents/en/concepts/data-transform.md',
    'repo/en/option/component/data-transform-filter.md',
    'repo/en/option/component/data-transform-sort.md',
    'repo/en/option/component/dataset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
