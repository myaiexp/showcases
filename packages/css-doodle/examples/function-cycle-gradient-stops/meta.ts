// @p.cycle rotates the colors of a gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cycle: shifting gradient stops",
  summary: "With commas, each rotation of the color list is a different gradient. Every cell picks one at random, so the same three colors start from a different one in each tile.",
  section: "Values",
  tags: ["@cycle","@p","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-cycle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
