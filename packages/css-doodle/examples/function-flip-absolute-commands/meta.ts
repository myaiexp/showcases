// Offsets from the start point mirror
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip: absolute commands mirror too",
  summary: "Absolute commands mirror their offset from the start point, so the first M stays where it is. The pink path is made of L commands, and each variant draws its flipH, flipV or both over it in black.",
  section: "SVG",
  tags: ["@flipH","@flipV","@flip","L","M"],
  docs: ["pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
