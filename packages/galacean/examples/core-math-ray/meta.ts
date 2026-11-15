// galacean example: Math: Ray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Ray",
  summary:
    "A Ray from the origin swinging across a plane, a sphere and a box. intersectPlane, intersectSphere and intersectBox return the distance (or -1 for a miss) and getPoint turns it into a hit point.",
  section: "Core",
  tags: ['Ray', 'intersectPlane', 'intersectSphere', 'intersectBox', 'getPoint'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
