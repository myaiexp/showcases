// css-doodle example: @at: the cell at a column and row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@at: the cell at a column and row",
  summary:
    "@at(4, 3) selects the cell in the fourth column and third row, and @at not inverts it. @cell with an x and y test does the same and takes several positions in one rule.",
  section: "Selectors",
  tags: ['@at', '@cell', 'not', '@x', '@y'],
  docs: [
    'pages/css-doodle-com/reference/selector-at.md',
    'pages/css-doodle-com/reference/selector-cell.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
