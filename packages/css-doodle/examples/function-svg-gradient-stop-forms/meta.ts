// A stop is a color, an offset and an opacity: red 30% .5
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: color, offset and opacity",
  summary: "A stop is a color, then an optional offset and opacity. A stop without an offset sits at its place in the list, as if the stops were evenly spaced. The disc over a checkered ground shows each form.",
  section: "SVG",
  tags: ["@radialGradient","stop","offset","opacity"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
