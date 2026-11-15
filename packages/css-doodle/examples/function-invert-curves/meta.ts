// @invert on a path with c and a commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invert: control points and arc radii swap",
  summary: "Control points and arc radii swap with the axes, so a curved leaf reflects as a whole shape. Pink is the original leaf, black is @invert.p of it.",
  section: "SVG",
  tags: ["@invert","path","curve","@p"],
  docs: ["pages/css-doodle-com/reference/function-invert.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
