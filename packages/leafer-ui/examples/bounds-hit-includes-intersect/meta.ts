// leafer-ui example: Bounds: hit, includes and intersect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: hit, includes and intersect",
  summary: "hit(b) tells whether two boxes overlap, includes(b) whether one contains the other, and getIntersect(b) returns the overlapping box. A moving box crosses a fixed one and the three answers update.",
  section: "Utilities",
  tags: ["Bounds", "hit", "includes", "getIntersect", "intersect", "isEmpty"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Bounds.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
