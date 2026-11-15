// galacean example: Screen to world: placing a marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Screen to world: placing a marker",
  summary:
    "A marker sphere follows the pointer through screenToWorldPoint, where the point's z is the distance from the camera; the card drives it along a path, the full view follows the mouse and a slider sets that distance.",
  section: "Camera",
  tags: ['Camera', 'screenToWorldPoint', 'Vector3'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
