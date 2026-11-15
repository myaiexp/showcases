// css-doodle example: @match: gcd of coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@match: gcd of coordinates",
  summary:
    "The Math functions are available inside @match: where gcd(x - 1, y - 1) is not 1 the cell is a white tile with a black outline, and a stack of shadows gives the red ground its pattern. The hue turns slowly.",
  section: "Selectors",
  tags: ['@match', 'gcd', '@m', '@n', '@I'],
  docs: [
    'pages/css-doodle-com/reference/selector-match.md',
    'pages/css-doodle-com/reference/function-m.md',
    'pages/css-doodle-com/reference/function-n.md',
    'pages/css-doodle-com/reference/function-i.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
