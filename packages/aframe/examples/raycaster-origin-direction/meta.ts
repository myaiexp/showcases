// aframe example: raycaster: origin, direction and useWorldCoordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: origin, direction and useWorldCoordinates",
  summary: "origin and direction place a ray relative to its entity, or in world space with useWorldCoordinates. One ray fans through directions by animating raycaster.direction while its parent stays still; a second world-space ray ignores the turning parent it sits in. Lines are drawn with showLine.",
  section: 'Components',
  tags: ["raycaster", "origin", "direction", "useWorldCoordinates", "showLine", "animation"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
