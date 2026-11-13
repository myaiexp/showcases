// Perspective example: filter_op joins filters with AND or OR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filters joined with AND or OR',
  summary: 'Several filters are joined with AND by default; filter_op "or" keeps rows that pass any of them. The output shows the resulting row count from the viewer View.',
  section: 'Selection and Ordering',
  tags: ['filter', 'filter_op', 'getView', 'num_rows'],
  docs: ['repo/docs/md/explanation/view/config/selection_and_ordering.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
