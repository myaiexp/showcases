// playcanvas example: Hierarchy: a small solar system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hierarchy: a small solar system",
  summary: "Five entities, two of which turn: earthOrbit carries the earth round the sun and moonOrbit carries the moon round the earth, so each child inherits every ancestor's motion.",
  section: "Entity Component System",
  tags: ["Entity","addChild","rotateLocal","setLocalPosition","setLocalEulerAngles"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
