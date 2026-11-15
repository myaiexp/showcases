// Each arc continues the current path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: arcs and lines chain into one shape",
  summary: "An arc continues the current path: a line joins its start to wherever the pen was. Two half circles one after the other give a stadium outline, because the second arc's leading line becomes the straight edge, then Z closes the other one.",
  section: "SVG",
  tags: ["@arc","path","Z","chained"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
