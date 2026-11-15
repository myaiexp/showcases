// galacean example: Math: plane against point, sphere and box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: plane against point, sphere and box",
  summary:
    "A point, a sphere and a box slide through a plane. intersectsPlaneAndPoint, intersectsPlaneAndSphere and intersectsPlaneAndBox classify each as Front, Back or Intersecting, and distancePlaneAndPoint gives the signed distance.",
  section: "Core",
  tags: ['CollisionUtil', 'intersectsPlaneAndPoint', 'intersectsPlaneAndSphere', 'intersectsPlaneAndBox', 'distancePlaneAndPoint', 'PlaneIntersectionType'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
