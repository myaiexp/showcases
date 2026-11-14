// css-doodle example: Grid dimensions: n, n x m, depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid dimensions: n, n x m, depth",
  summary:
    "The numbers after @grid are columns, then rows: a single number is a square, 5x2 is wide, 2X6 and 8,3 write the same thing with other separators. When one of them is 1 the other may run far past the usual 64, here 1x30.",
  section: "Properties",
  tags: ['@grid', 'dimensions'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
