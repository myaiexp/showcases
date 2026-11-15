// union with grow: d outsets the joined shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: grow moves the outline",
  summary: "union*2 makes two blocks from one definition: the first is grown by .8 and painted pink, the second not grown and painted black, drawn on top. grow: d moves the joined outline out by d, or in when it is negative.",
  section: "SVG",
  tags: ["@svg","union","grow","@pn","@Plot"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
