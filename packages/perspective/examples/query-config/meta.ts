// Perspective example: a View query from four config options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Query configuration',
  summary:
    'table.view() takes one config object: columns, aggregates, group_by and filter compose freely. Change any of them and a new View is created over the same Table, its to_json() printed beside a viewer running the identical query.',
  section: 'View',
  tags: ['view', 'columns', 'aggregates', 'group_by', 'filter', 'to_json', 'num_rows'],
  docs: ['repo/docs/md/explanation/view.md', 'repo/docs/md/explanation/view/querying.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
