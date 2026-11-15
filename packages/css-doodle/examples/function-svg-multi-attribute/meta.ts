// A single value sets every attribute, drawn once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: x, y: one value for both",
  summary: "x, y: 1, 2 sets x=\"1\" and y=\"2\", and a single value sets both attributes and is evaluated once, so x, y: @r(10) puts a circle on the diagonal. Giving each attribute its own @r scatters the dots instead.",
  section: "SVG",
  tags: ["@svg","x, y","@r","circle*30"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
