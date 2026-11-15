// Cell variables: x, y, i and their totals X, Y, I
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell variables: x, y, i and their totals X, Y, I",
  summary: "Each cell knows its column x and row y, counted from 1 at the top-left, its index i, and the totals X, Y and I. Dividing one by the other gives a 0 to 1 gray that sweeps across columns, down rows, along the index, or all three at once.",
  section: "Patterns",
  tags: ["@pattern", "x", "y", "i", "X", "Y", "I"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
