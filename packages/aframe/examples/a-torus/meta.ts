// aframe example: <a-torus>: arc, radius-tubular and segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "<a-torus>: arc, radius-tubular and segments",
  summary:
    "<a-torus> is a ring-shaped tube: radius is the ring, radius-tubular the tube. The docs' torus draws a 270 degree arc, a fat low-segment torus shows segments-radial and segments-tubular, and a third torus animates arc from a sliver to a full ring.",
  section: 'Primitives',
  tags: ["a-torus", "arc", "radius", "radius-tubular", "segments-radial", "segments-tubular"],
  docs: ["repo/docs/primitives/a-torus.md", "repo/docs/components/geometry.md", "repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
