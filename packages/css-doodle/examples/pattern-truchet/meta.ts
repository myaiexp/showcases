// Truchet tiles: random arcs in each cell with arc() and rand()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Truchet tiles: random arcs in each cell with arc() and rand()",
  summary: "Each cell of a 10 × 10 grid draws two quarter-circle strokes with arc(), flipped at random by rand() so the lines join into winding paths. du and dv are the offsets inside the cell.",
  section: "Patterns",
  tags: ["@pattern", "arc", "rand", "du", "dv", "shape"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
