// draw: 3s infinite on a path with an @arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: drawing an arc over time",
  summary: "An @arc path is an ordinary path, so the draw shortcut of @svg traces it. A three-quarter ring and a small ring inside it draw themselves in three seconds and repeat.",
  section: "SVG",
  tags: ["@arc","@svg","draw"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
