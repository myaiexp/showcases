// One segment mirrored four ways closes a border
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip: a traditional border pattern",
  summary: "Combined with @invert and @reverse, one segment can close a border. @p(…) stores a stage and .p reuses that pick: the segment, its flip.invert.reverse, a flipV.invert copy and a final flip close a square meander.",
  section: "SVG",
  tags: ["@flip","@flipV","@invert","@reverse","@p","border"],
  docs: ["pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
