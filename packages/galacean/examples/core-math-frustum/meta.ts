// galacean example: Math: BoundingFrustum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: BoundingFrustum",
  summary:
    "A frustum made from a view-projection matrix, drawn as its eight corners, with boxes and spheres sliding through it. intersectsBox and intersectsSphere colour them, and frustumContainsBox reports Contains, Intersects or Disjoint.",
  section: "Core",
  tags: ['BoundingFrustum', 'intersectsBox', 'intersectsSphere', 'Matrix', 'perspective', 'lookAt', 'CollisionUtil', 'frustumContainsBox'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
