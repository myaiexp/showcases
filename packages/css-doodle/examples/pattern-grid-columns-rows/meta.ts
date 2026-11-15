// grid: n x m, columns by rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "grid: n x m, columns by rows",
  summary: "grid sets the columns, or n x m for columns and rows. A 32 x 12 grid on a 16:9 image makes wide, nearly square cells; each paints a color from its own column and row and fades with the distance dc from the middle.",
  section: "Patterns",
  tags: ["@pattern", "grid", "x", "y"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
