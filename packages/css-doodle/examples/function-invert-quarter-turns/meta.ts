// @invert with @flipH or @flipV makes a quarter turn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invert: with a flip it rotates",
  summary: "An invert alone is a mirror along the diagonal, but combined with @flipH or @flipV it is a quarter turn. The variants draw the same corner shape and its turned copies: original, flipH.invert and flipV.invert.",
  section: "SVG",
  tags: ["@invert","@flipH","@flipV","rotate"],
  docs: ["pages/css-doodle-com/reference/function-invert.md","pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
