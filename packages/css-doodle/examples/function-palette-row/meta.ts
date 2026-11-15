// @palette gives a seeded list of matching colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: five colors that go together",
  summary: "@pn(@palette()) walks five oklch colors across five columns. The doodle's seed picks the palette, so every redraw is a new set that still belongs together.",
  section: "Values",
  tags: ["@palette","@pn","oklch"],
  docs: ["pages/css-doodle-com/reference/function-palette.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
