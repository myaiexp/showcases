// galacean example: Math: Plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Plane",
  summary:
    "A Plane from a normal and a distance, and from three points with Plane.fromPoints. The plane is drawn as a translucent sheet with its normal; the distance moves it along the normal.",
  section: "Core",
  tags: ['Plane', 'fromPoints', 'Vector3'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
