// Fill: CSS color functions read as channels inside an expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fill: CSS color functions read as channels inside an expression",
  summary: "Inside an expression a hex color or a CSS color function reads as its channels, so mix(oklch(.75 .15 60), oklch(.45 .2 280), y / 64) blends two oklch colors down the grid. hsl() with plain numbers stays the pattern's own, from 0 to 1.",
  section: "Patterns",
  tags: ["@pattern", "fill", "mix", "oklch", "hsl"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
