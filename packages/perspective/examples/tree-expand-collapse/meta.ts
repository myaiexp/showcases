// Perspective example: expanding and collapsing a group_by tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Expand, collapse and depth',
  summary:
    'A View with group_by ["Region", "State"] is a tree. collapse(row), expand(row) and set_depth(n) open and close its levels, and the rows left in the View are printed as an indented tree after each call.',
  section: 'Advanced View',
  tags: ['expand', 'collapse', 'set_depth', 'group_by', 'tree', 'to_json'],
  docs: ['repo/docs/md/explanation/view/advanced.md', 'repo/docs/md/explanation/view.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
