// $name: each cell's own custom property in a pattern
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "$name: each cell's own custom property in a pattern",
  summary: "$name inserts the text of the cell's custom property --name when the pattern is made, so each cell can draw something different. Here --k: @i feeds each cell its index, which sizes the circle in its pattern. The variants change the grid to 3, 4 and 5 columns.",
  section: "Patterns",
  tags: ["@pattern", "$name", "--name", "@i", "background"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
