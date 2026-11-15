// css-doodle example: @random: independent draws
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@random: independent draws",
  summary:
    "Three @random rules on one grid: two draw a top and a left border, the third picks a fifth of the cells and paints a bar of random width in each. No rule shares cells with another on purpose.",
  section: "Selectors",
  tags: ['@random', '@r', '@lr'],
  docs: [
    'pages/css-doodle-com/reference/selector-random.md',
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
