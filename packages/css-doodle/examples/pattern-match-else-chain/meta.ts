// match { … }: an else chain, the first test that holds wins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "match { … }: an else chain, the first test that holds wins",
  summary: "A match block that lists tests in one block runs the first arm whose test holds, and else catches the rest. Here the diagonals are white, rings of the Chebyshev distance dc are black as they move outward, and everything else is white.",
  section: "Patterns",
  tags: ["@pattern", "match", "else", "dc", "t"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
