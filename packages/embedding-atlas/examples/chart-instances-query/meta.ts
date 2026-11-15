// embedding-atlas example: instances spec query with $table and $filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Instances from a SQL query",
  summary:
    "The query option replaces the rows of an instances table with a SQL result. $table is the data table and $filter the current crossfilter, so this grouped summary of topics follows the words brush saved in chartStates.",
  section: "Charts",
  tags: ['instances', 'query', '$table', '$filter', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/instances/types.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
