// Perspective example: several live Views over a single streaming Table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Many views, one table',
  summary:
    'One indexed Table of quotes, updated every second, feeds two viewers and three engine Views at once. Each View keeps its own group_by, filter and sort and recalculates itself on every update.',
  section: 'View',
  tags: ['view', 'live', 'on_update', 'streaming', 'group_by', 'filter', 'sort'],
  docs: [
    'repo/docs/md/explanation/view.md',
    'repo/docs/md/explanation/view/querying.md',
    'repo/docs/md/explanation/view/advanced.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
