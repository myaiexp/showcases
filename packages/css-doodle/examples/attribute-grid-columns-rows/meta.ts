// css-doodle example: The grid attribute: columns and rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The grid attribute: columns and rows",
  summary:
    "The grid attribute sets columns and rows: one number is a square, 5x2 is wide, and x, X, comma and spaces all separate. The attribute sets only the dimensions; each cell reports its place with @x and @y.",
  section: "Attributes",
  tags: ['grid', '@x', '@y', '@i'],
  docs: [
    'pages/css-doodle-com/reference/attribute-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
