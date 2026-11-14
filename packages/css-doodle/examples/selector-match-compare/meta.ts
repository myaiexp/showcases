// css-doodle example: @match: comparing x and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@match: comparing x and y",
  summary:
    "@match(x ≤ y) fills the triangle under the diagonal; = is ==, so x = y is the diagonal, and X - x + 1 == y is the other one. ≠, ≥ and the plain ASCII forms work too.",
  section: "Selectors",
  tags: ['@match', 'x', 'y', 'X', '≤', '≠'],
  docs: [
    'pages/css-doodle-com/reference/selector-match.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
