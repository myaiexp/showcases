// match: rules that only run where a test holds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "match: rules that only run where a test holds",
  summary: "match(condition) { … } runs its rules only in the cells where the condition is true. x*x*y*y % 120 < 24 picks a pattern of cells from a 119-column grid; the variants change the number it is compared with.",
  section: "Patterns",
  tags: ["@pattern", "match", "grid", "fill"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
