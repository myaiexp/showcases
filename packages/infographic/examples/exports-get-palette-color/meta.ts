// AntV Infographic example: Exports: getPaletteColor() by index and total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getPaletteColor() by index and total",
  summary:
    "getPaletteColor(palette, indexes, total) returns one colour: from an array it cycles through the colours by index, from a function palette it uses index and total to place the colour on the ramp. Rows of chips call it for every index, with a palette name, an array and then a longer total, so you can see cycling and spreading.",
  section: "Exports",
  tags: ["getPaletteColor", "Palette", "indexes"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
