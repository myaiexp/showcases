// embedding-atlas example: count-plot data.isList on a list-of-text tags column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Count plot over a list column",
  summary:
    "The tags column holds a list of strings per row. With isList: true the count plot counts every tag separately; without it the whole list is one category. The count plot is the same one the default charts build for a string[] column.",
  section: "Charts",
  tags: ['count-plot', 'data.isList', 'data.field', 'limit'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
