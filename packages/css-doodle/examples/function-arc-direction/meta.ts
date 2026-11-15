// When to is less than from the arc runs backwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: clockwise and counter-clockwise",
  summary: "When to is less than from the arc is counter-clockwise. Both strokes go from the same start to the same end, one the short way round (30 to 150) and one the long way back (150 to 30), so together they close a circle in two colors.",
  section: "SVG",
  tags: ["@arc","from","to"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
