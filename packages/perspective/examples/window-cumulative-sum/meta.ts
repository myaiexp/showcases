// Perspective example: a cumulative window with partition_by
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cumulative sum window',
  summary: 'cumulative: true frames every row from the partition start through the current one, a running total. partition_by restarts it for each Region or Category.',
  section: 'Window Columns',
  tags: ['windows', 'cumulative', 'partition_by', 'order_by', 'sort'],
  docs: ['repo/docs/md/explanation/view/config/windows.md', 'repo/docs/md/explanation/view/config/selection_and_ordering.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
