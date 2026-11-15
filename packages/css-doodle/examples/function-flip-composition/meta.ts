// @flip.invert.reverse.p is flip(invert(reverse(p)))
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip: chains read right to left",
  summary: "Composition reads right to left: @flip.invert.reverse.p is @flip(@invert(@reverse(@p()))). The variants build up a chain on one stored path, one function at a time.",
  section: "SVG",
  tags: ["@flip","@invert","@reverse","@p","composition"],
  docs: ["pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
