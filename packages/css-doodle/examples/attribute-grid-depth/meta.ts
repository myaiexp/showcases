// css-doodle example: The grid attribute: depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The grid attribute: depth",
  summary:
    "A third number nests the cells: on a 1x1xN grid they form a chain, each holding the next, and @z is the depth. The same rotated-square spiral is drawn at depths from 3 to 9.",
  section: "Attributes",
  tags: ['grid', 'depth', '@z', '@cell'],
  docs: [
    'pages/css-doodle-com/reference/attribute-grid.md',
    'pages/css-doodle-com/reference/selector-cell.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
