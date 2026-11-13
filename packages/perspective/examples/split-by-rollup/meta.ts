// Perspective example: split_by and split_rollup_mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split by and split rollup',
  summary:
    'split_by creates one column per unique value of the split columns. split_rollup_mode "rollup" also emits a grand-total column and, with two split levels, subtotal columns.',
  section: 'Grouping and Pivots',
  tags: ['split_by', 'split_rollup_mode', 'pivot', 'group_by'],
  docs: ['repo/docs/md/explanation/view/config/grouping_and_pivots.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
