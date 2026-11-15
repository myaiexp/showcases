// A one-expression user function: --ring(r, w)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A one-expression user function: --ring(r, w)",
  summary: "A body of one expression is one value, and each argument that is not a name or number is parenthesized, so $ring(.15 + .03sin(t), .02) reads as expected. Three calls draw three rings that pulse in different ways.",
  section: "Patterns",
  tags: ["@pattern", "--name()", "$name()", "shape"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
