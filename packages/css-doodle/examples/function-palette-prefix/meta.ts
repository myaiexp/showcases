// @palette(3) is the first three of @palette(5)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: a larger count keeps the smaller",
  summary: "With the seed fixed, asking for 2, 3, 5 and 9 colors always returns the same start. Each variant draws its list across nine cells, so you can see the first colors never change.",
  section: "Values",
  tags: ["@palette","seed"],
  docs: ["pages/css-doodle-com/reference/function-palette.md","pages/css-doodle-com/reference/attribute-seed.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
