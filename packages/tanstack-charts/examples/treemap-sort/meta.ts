// tanstack-charts example: Sorting siblings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sorting siblings",
  summary:
    "Without sort the tiles keep the order of the source rows. A comparator over node values puts the largest or smallest sibling first in every group, which moves tiles toward the top-left corner.",
  section: "Treemap Mark",
  tags: ['treemap', 'sort', 'TreemapNodeComparator'],
  docs: ['repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
