// Perspective example: a derived Table built from a flat group_by View
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A table from a view',
  summary:
    'client.table(view) turns a flat group_by View into a read-only Table that the engine keeps current: add orders to the source and the derived totals change in the same cycle. Its group columns become the index, and update() on it throws.',
  section: 'Derived Tables',
  tags: ['derived table', 'client.table(view)', 'group_rollup_mode', 'flat', 'read-only', 'get_index'],
  docs: ['repo/docs/md/explanation/derived_table.md', 'repo/docs/md/explanation/view/advanced.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
