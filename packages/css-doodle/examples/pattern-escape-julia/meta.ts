// escape(z, c): a Julia set that starts from z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "escape(z, c): a Julia set that starts from z",
  summary: "With two arguments escape starts the loop from z, so escape(2.8pos, vec2(-.8, .156)) is the Julia set from the repeat example. Moving c with time morphs the whole set.",
  section: "Patterns",
  tags: ["@pattern", "escape", "hsl"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
