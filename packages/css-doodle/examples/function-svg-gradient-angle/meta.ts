// @linearGradient(45deg, stops) for fill and stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: a cut circle",
  summary: "SVG gradients written like CSS color stops. An angle first rotates the gradient, and the same angle with the stops reversed makes each circle look cut into its square tile. The radius changes with every redraw.",
  section: "SVG",
  tags: ["@linearGradient","@svg","@r"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
