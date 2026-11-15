// @arc(...) L 0 0 Z is a pie slice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: a line back to the center closes a pie",
  summary: "The data ends at the arc's end, so adding L 0 0 Z draws a line to the center and closes it: a pie slice. The center defaults to the origin, so the viewBox is centered on it. The variants change the sweep.",
  section: "SVG",
  tags: ["@arc","L","Z","pie"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
