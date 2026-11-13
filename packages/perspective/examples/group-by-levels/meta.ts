// Perspective example: group_by hierarchies and group_by_depth on a Datagrid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group by levels and depth',
  summary:
    'group_by is an ordered list of columns, each level nesting inside the previous one with a total row per group. group_by_depth opens the groups only to a given depth.',
  section: 'Grouping and Pivots',
  tags: ['group_by', 'group_by_depth', 'hierarchy', 'restore'],
  docs: ['repo/docs/md/explanation/view/config/grouping_and_pivots.md', 'repo/docs/md/FAQ.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
