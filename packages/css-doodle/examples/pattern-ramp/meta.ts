// ramp(t, stop, …): colors and positions as in a CSS gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ramp(t, stop, …): colors and positions as in a CSS gradient",
  summary: "ramp maps a value onto stops written as in a CSS gradient, colors or numbers, each with an optional position. A repeated position is a hard edge, as in the three-color disc from the docs; the other variants spread stops evenly, place them, and ramp plain numbers.",
  section: "Patterns",
  tags: ["@pattern", "ramp", "length", "pos"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
