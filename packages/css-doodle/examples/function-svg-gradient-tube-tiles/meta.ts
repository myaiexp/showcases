// Stops that rise and fall shade a ring like a tube
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: tube-shaded arcs",
  summary: "Stops that rise to the middle of the ring and fall again shade it like a tube, and the first stop, at opacity 0, leaves the center empty. A fill on g fits the gradient to each circle, and every tile turns by 0 or 90 degrees, so the arcs join up in a random maze.",
  section: "SVG",
  tags: ["@radialGradient","g","transform","@p","opacity"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
