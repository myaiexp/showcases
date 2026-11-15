// Grid and fill: a Sierpinski triangle from a bitwise test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid and fill: a Sierpinski triangle from a bitwise test",
  summary: "grid: 64 cuts the image into 64 columns and rows; fill paints every cell white, then a match block turns black the cells where (x - 1) & (y - 1) is not zero. The variants run the same rules on 16, 32 and 64 columns.",
  section: "Patterns",
  tags: ["@pattern", "grid", "fill", "match", "x", "y"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
