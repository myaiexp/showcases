// Perspective example: filtering aggregated groups through a derived Table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filtering on an aggregate',
  summary:
    'A flat Category and Sub-Category total View becomes a derived Table, and a plain filter on its Sales column then keeps only the large groups: HAVING for live data. Raise the threshold or add orders and groups cross it.',
  section: 'Derived Tables',
  tags: ['derived table', 'HAVING', 'filter', 'aggregate', 'group_rollup_mode', 'flat'],
  docs: ['repo/docs/md/explanation/derived_table.md', 'repo/docs/md/explanation/view/querying.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
