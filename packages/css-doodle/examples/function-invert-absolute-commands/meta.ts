// Absolute coordinates swap their offset from the start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invert: absolute commands",
  summary: "Relative commands swap their deltas; absolute ones swap their offset from the start point, so the first M stays where it is. The pink path uses L commands, and the black one is its invert, a reflection through (2, 2).",
  section: "SVG",
  tags: ["@invert","L","M","path"],
  docs: ["pages/css-doodle-com/reference/function-invert.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
