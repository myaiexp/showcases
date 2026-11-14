// playcanvas example: Adding and removing components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Adding and removing components",
  summary: "An entity starts as a transform. addComponent gives it render and light abilities and returns null if it already has one; enabled switches a component off while keeping its settings, and removeComponent deletes it.",
  section: "Entity Component System",
  tags: ["addComponent","removeComponent","enabled","entity.render","entity.light"],
  docs: ["repo/docs/user-manual/ecs/components.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
