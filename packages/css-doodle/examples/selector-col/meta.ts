// css-doodle example: @col: cells in columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@col: cells in columns",
  summary:
    "@col(even) and @col(3) colour whole columns, @col not inverts and @x is another name for the same selector.",
  section: "Selectors",
  tags: ['@col', '@x', 'even', 'not'],
  docs: [
    'pages/css-doodle-com/reference/selector-col.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
