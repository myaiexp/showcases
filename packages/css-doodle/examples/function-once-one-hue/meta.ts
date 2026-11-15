// @once draws a random value one time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Once: one hue for the whole grid",
  summary: "hsl(@once(@r(360)), 70%, @r(30%, 80%)) draws a single hue and reuses it in every cell, while the lightness is still a fresh random value per cell. Each redraw picks one new hue for the lot.",
  section: "Values",
  tags: ["@once","@r","hsl"],
  docs: ["pages/css-doodle-com/reference/function-once.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
