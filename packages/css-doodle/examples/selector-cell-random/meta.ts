// css-doodle example: @cell(random): chance and count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@cell(random): chance and count",
  summary:
    "@cell(random) alone picks each cell with probability .5; a ratio or a count after it works as in @random, and several random arguments each draw their own cells.",
  section: "Selectors",
  tags: ['@cell', 'random', 'ratio', 'count'],
  docs: [
    'pages/css-doodle-com/reference/selector-cell.md',
    'pages/css-doodle-com/reference/selector-random.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
