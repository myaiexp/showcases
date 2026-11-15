// css-doodle example: :hover on a cell, and @cell with a state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":hover on a cell, and @cell with a state",
  summary:
    "A selector that starts with a colon is appended to the cell, so :hover styles each cell under the pointer. Nested under @cell(x = y) it applies only to the diagonal. Cards replay the hover with an animation of the same colours.",
  section: "Selectors",
  tags: [':hover', 'nesting', '@cell', '&'],
  docs: [
    'pages/css-doodle-com/reference/selector-nesting.md',
    'pages/css-doodle-com/reference/selector-cell.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
