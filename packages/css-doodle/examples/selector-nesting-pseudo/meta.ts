// css-doodle example: Pseudo-elements in a cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pseudo-elements in a cell",
  summary:
    "A selector that starts with a colon attaches to the cell, so ::after is the cell's own pseudo-element, and @r and @p inside it vary from cell to cell.",
  section: "Selectors",
  tags: ['::after', 'nesting', '@r', '@p'],
  docs: [
    'pages/css-doodle-com/reference/selector-nesting.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
