// css-doodle example: @random with an expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@random with an expression",
  summary:
    "@random takes an expression over the cell variables, so (y - 1) / Y makes the top row nearly empty and the bottom one nearly full.",
  section: "Selectors",
  tags: ['@random', 'expression', '@y'],
  docs: [
    'pages/css-doodle-com/reference/selector-random.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
