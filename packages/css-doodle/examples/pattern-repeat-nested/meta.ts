// Nested loops: a grid of dots from repeat inside repeat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Nested loops: a grid of dots from repeat inside repeat",
  summary: "Loops nest, up to 65536 steps in all. Two repeats of 7 place 49 dots, each painted over what came before, with hue and size changing with the loop numbers and time.",
  section: "Patterns",
  tags: ["@pattern", "repeat", "hsl", "shape"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
