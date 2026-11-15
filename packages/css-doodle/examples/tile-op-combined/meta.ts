// css-doodle example: Combining operator letters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combining operator letters",
  summary:
    "Letters run right to left, so op: tk cuts the corners off the triangles that k made. The skipped letters rule means a letter from another notation, such as Q, is ignored.",
  section: 'Shapes',
  tags: ['@tile', 'op', '@tile.hex', '@tile.triangle'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
