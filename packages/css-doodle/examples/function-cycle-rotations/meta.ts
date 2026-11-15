// @p.cycle picks one rotation of a list per cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cycle: rotations of a list",
  summary: "@p.cycle(100% 0 0 0) takes the four border-radius values and hands each cell one of their four rotations, so the one rounded corner lands in a different corner from cell to cell. A single space-separated argument gives space-separated rotations, which suits shorthand properties.",
  section: "Values",
  tags: ["@cycle","@p","border-radius"],
  docs: ["pages/css-doodle-com/reference/function-cycle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
