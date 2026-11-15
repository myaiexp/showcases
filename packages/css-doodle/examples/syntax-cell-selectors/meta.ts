// The overview's @cell example: both diagonals, then cells far from the centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cell selectors in one doodle',
  summary:
    "The syntax overview's selector example, built up a block at a time. @cell(x = y, x + y = 10) matches either diagonal of a 9 × 9 grid, and @cell not (dr < 3) rounds every cell whose straight-line distance from the centre is 3 or more.",
  section: 'Syntax overview',
  tags: ["@cell", "not", "x", "y", "dr"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "pages/css-doodle-com/reference/selector-cell.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
