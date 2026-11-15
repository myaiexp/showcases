// @raw(@svg(...)) puts the SVG in as markup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raw: an SVG inserted as an element",
  summary: "When the text is an SVG data URL, as @svg produces, @raw decodes the SVG markup so it is inserted as an element instead of used as an image. The circle inside is a real DOM node of the cell.",
  section: "Values",
  tags: ["@raw","@svg","@content"],
  docs: ["pages/css-doodle-com/reference/function-raw.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
