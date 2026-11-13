// Perspective example: choosing aggregate functions per column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aggregate functions',
  summary:
    'aggregates maps a column to the function that rolls its rows up under each group_by level: sums, averages, order statistics, cardinality and percentages, plus weighted mean, max by and min by that read a second column.',
  section: 'Grouping and Pivots',
  tags: ['aggregates', 'weighted mean', 'max by', 'pct sum parent', 'median', 'group_by'],
  docs: ['repo/docs/md/explanation/view/config/grouping_and_pivots.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
