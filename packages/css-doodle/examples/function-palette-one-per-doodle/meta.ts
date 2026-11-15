// :doodle and the cells share one palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: the same list in every cell",
  summary: "@palette(1) on :doodle, the ground color, sits behind round cells that take @p(@palette(4)). Every cell and :doodle read the same list, and calling @palette takes nothing from the random values of @r and @p.",
  section: "Values",
  tags: ["@palette",":doodle","@p"],
  docs: ["pages/css-doodle-com/reference/function-palette.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
