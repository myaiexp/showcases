// @content: @svg(...) puts the element in the cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: inline with @content",
  summary: "Using @content instead of background puts the <svg> element inside the cell, rather than using it as a background image. Twelve concentric rings, each with r from @nN, make a target; the variants vary the number of rings.",
  section: "SVG",
  tags: ["@svg","@content","circle*12","@nN"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
