// embedding-atlas example: instances spec columns, sort, pageSize, page offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Instances table: columns, sort and pages",
  summary:
    "An instances chart in table mode, limited to four columns, sorted by words descending with pageSize 8. The variants flip the sort direction and show the saved InstancesState offset, which moves the table to a later page.",
  section: "Charts",
  tags: ['instances', 'columns', 'sort', 'pageSize', 'viewMode: table', 'InstancesState', 'offset', 'defaultHeight'],
  docs: [
    'repo/packages/viewer/src/charts/instances/types.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
