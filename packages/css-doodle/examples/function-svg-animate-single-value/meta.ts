// A single animate value is the target; no name is draw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: one value, or no name",
  summary: "A single value after animate is the value to animate to, here growing a circle from its own radius to 4. With no attribute name at all, animate is the same as draw, so the second variant traces its outline.",
  section: "SVG",
  tags: ["@svg","animate","draw"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
