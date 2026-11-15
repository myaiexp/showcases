// galacean example: Math: BoundingBox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: BoundingBox",
  summary:
    "Five ways to get an axis-aligned box: fromCenterAndExtent, fromPoints, fromSphere, transform with a matrix and merge of two boxes, each drawn as a wireframe with its centre and extent.",
  section: "Core",
  tags: ['BoundingBox', 'fromCenterAndExtent', 'fromPoints', 'fromSphere', 'transform', 'merge', 'getCenter', 'getExtent', 'getCorners'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
