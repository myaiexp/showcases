// css-doodle example: @match: distance from the centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@match: distance from the centre",
  summary:
    "dr is the Euclidean, dm the Manhattan and dc the Chebyshev distance from the centre of the grid, and db the distance to the nearest edge. Each variant is a different way to ask \"how far\".",
  section: "Selectors",
  tags: ['@match', 'dr', 'dm', 'dc', 'db'],
  docs: [
    'pages/css-doodle-com/reference/selector-match.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
