// galacean example: Math: sphere and box intersection tests
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: sphere and box intersection tests",
  summary:
    "A moving sphere and a moving box meet a static sphere and a static box: intersectsSphereAndSphere, intersectsSphereAndBox and intersectsBoxAndBox decide which static shapes light up.",
  section: "Core",
  tags: ['CollisionUtil', 'intersectsSphereAndSphere', 'intersectsSphereAndBox', 'intersectsBoxAndBox', 'BoundingSphere', 'BoundingBox'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
