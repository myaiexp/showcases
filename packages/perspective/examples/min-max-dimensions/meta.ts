// Perspective example: View introspection (min/max, dimensions)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Min, max and dimensions',
  summary:
    'Questions a View can answer about itself: the [min, max] of a column, how many rows and columns it has (header rows included), its column paths and the config that made it. Change group_by and split_by to watch the numbers move.',
  section: 'Advanced View',
  tags: ['get_min_max', 'dimensions', 'num_rows', 'num_columns', 'column_paths', 'get_config'],
  docs: ['repo/docs/md/explanation/view/advanced.md', 'repo/docs/md/explanation/view.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
