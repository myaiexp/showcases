// @palette around tomato, oklch() and other colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: any CSS color as the base",
  summary: "The color can be a name, an oklch() value or any other CSS color. With a fixed seed, each variant shows a different base color and the palette built around it.",
  section: "Values",
  tags: ["@palette","oklch"],
  docs: ["pages/css-doodle-com/reference/function-palette.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
