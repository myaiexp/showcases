// @svg is a url() for background, mask or border-image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: as a mask or a border-image",
  summary: "The result of @svg is a url(), so it works wherever an image does. The same polka-dot SVG is the background, a mask over a pink gradient, and a border-image on the edge of the cell.",
  section: "SVG",
  tags: ["@svg","mask","border-image","background"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
