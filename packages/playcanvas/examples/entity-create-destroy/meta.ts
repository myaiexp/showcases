// playcanvas example: Creating and destroying entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Creating and destroying entities",
  summary: "New entities join the scene when added to a parent. destroy() removes an entity for good and fires its destroy event, while removeChild() only detaches it, so it can be added back. Cards spawn and destroy cubes in a loop.",
  section: "Entity Component System",
  tags: ["Entity","addChild","removeChild","destroy","destroy event"],
  docs: ["repo/docs/user-manual/ecs/entities.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
