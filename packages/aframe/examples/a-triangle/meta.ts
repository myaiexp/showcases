// aframe example: <a-triangle>: vertex-a, vertex-b, vertex-c and a ground tile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "<a-triangle>: vertex-a, vertex-b, vertex-c and a ground tile",
  summary:
    "<a-triangle> takes three vertex positions as attributes. The docs' triangle moves vertex-c, a textured one lies flat on the ground, and an animation moves vertex-a back and forth so the shape shears.",
  section: 'Primitives',
  tags: ["a-triangle", "vertex-a", "vertex-b", "vertex-c", "src", "rotation"],
  docs: ["repo/docs/primitives/a-triangle.md", "repo/docs/components/geometry.md", "repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
