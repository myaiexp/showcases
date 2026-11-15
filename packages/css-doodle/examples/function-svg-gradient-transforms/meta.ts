// rotate(a, .5, .5) turns a gradient about its center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: an SVG transform",
  summary: "An SVG transform such as rotate(30), scale(1.5) or translate(.1, .1) works in the first place too. The angle turns the gradient around the top-left corner of the shape, so rotate(a, .5, .5) turns it around the center. Twelve dashed rings each get a random angle.",
  section: "SVG",
  tags: ["@linearGradient","rotate()","stroke","stroke-dasharray","circle*12"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
