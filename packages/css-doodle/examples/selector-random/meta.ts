// css-doodle example: @random: cells by chance or by count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@random: cells by chance or by count",
  summary:
    "A ratio below 1 picks each cell independently with that probability, a count of 1 or more picks exactly that many cells. Both doodles redraw with each new seed.",
  section: "Selectors",
  tags: ['@random', 'ratio', 'count'],
  docs: [
    'pages/css-doodle-com/reference/selector-random.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
