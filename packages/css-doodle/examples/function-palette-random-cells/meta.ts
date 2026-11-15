// @p(@palette()) colors a grid of dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: a random color per cell",
  summary: "The palette goes where any list of values does. @p picks one color for each round cell from the same five, so the grid has a limited, matching set of colors.",
  section: "Values",
  tags: ["@palette","@p"],
  docs: ["pages/css-doodle-com/reference/function-palette.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
