// A base segment and three transformed copies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invert: a Hilbert curve",
  summary: "A base segment and three transformed copies stay continuous: @flip.invert.p swaps axes then flips, @reverse.invert.flipH.p and @reverse.flipH.p follow, and the extra v1 joins the middle. @p(--base) stores the pick and .p reuses it.",
  section: "SVG",
  tags: ["@invert","@flip","@flipH","@reverse","@p","composition"],
  docs: ["pages/css-doodle-com/reference/function-invert.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
