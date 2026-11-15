// A last stop at opacity 0 fades each circle into a glow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: glowing dots",
  summary: "Sixty circles of random place and size are filled with a radial gradient from a random color to black at opacity 0, so each fades into the dark ground like a glow. Overlaps add up to a soft nebula.",
  section: "SVG",
  tags: ["@radialGradient","opacity","circle*60","@p"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
