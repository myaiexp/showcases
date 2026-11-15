// Operator shortcuts: 2t, **, a < b < c, ≠, and hsl without commas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Operator shortcuts: 2t, **, a < b < c, ≠, and hsl without commas",
  summary: "Expressions are GLSL with a few shortcuts: 2t means 2 * t, ** is a power, a < b < c chains tests, = ≠ ≤ ≥ read as ==, !=, <= and >=, and a space can separate call arguments. Each variant shows one on a 24 × 24 grid.",
  section: "Patterns",
  tags: ["@pattern", "**", "and", "≠", "hsl"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
