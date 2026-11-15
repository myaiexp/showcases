// css-doodle example: @cell: by column, row and point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@cell: by column, row and point",
  summary:
    "@cell(x = 2, y = 3) matches column 2 or row 3, && asks for both, and a pseudo-element after the selector decorates the matched cells.",
  section: "Selectors",
  tags: ['@cell', 'x', 'y', '&&', '::after'],
  docs: [
    'pages/css-doodle-com/reference/selector-cell.md',
    'pages/css-doodle-com/reference/selector-nesting.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
