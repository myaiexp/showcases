// match(t1, v1, t2, v2, …, else): a chain of values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "match(t1, v1, t2, v2, …, else): a chain of values",
  summary: "More pairs make a chain: match(t1, v1, t2, v2, …, else) gives the value after the first test that holds. Four colored bands follow a variable v that ripples with time.",
  section: "Patterns",
  tags: ["@pattern", "match", "fill", "t"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
