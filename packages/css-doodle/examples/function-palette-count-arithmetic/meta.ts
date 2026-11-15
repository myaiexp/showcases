// @palette counts take arithmetic, decimals are cut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: a count that is arithmetic",
  summary: "The count can be an expression: @palette(2 * 3) is six colors, and @palette(4.9) is cut to four, which @pn then repeats across the six cells.",
  section: "Values",
  tags: ["@palette","@pn"],
  docs: ["pages/css-doodle-com/reference/function-palette.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
