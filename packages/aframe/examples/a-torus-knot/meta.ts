// aframe example: <a-torus-knot>: p, q and three different knots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "<a-torus-knot>: p, q and three different knots",
  summary:
    "<a-torus-knot> winds a tube p times around its axis and q times around the circle inside the tube. Three knots (2,3), (2,7) and (3,5) spin side by side, and the docs' knot with arc 180 shows only half its length.",
  section: 'Primitives',
  tags: ["a-torus-knot", "p", "q", "radius", "radius-tubular", "segments-tubular", "arc"],
  docs: ["repo/docs/primitives/a-torus-knot.md", "repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
