// aframe example: position: children inherit their parent's position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "position: children inherit their parent's position",
  summary: "The docs' parent with two children: #child1 has no position so its world position is the parent's 1 2 3, and #child2 at 2 3 4 lands at 3 5 7 in world space. Spheres mark them, and the read-out prints local and world positions, which follow the parent as it moves.",
  section: 'Components',
  tags: ["position", "relative positioning", "getWorldPosition", "object3D.position", "children"],
  docs: ["repo/docs/components/position.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
