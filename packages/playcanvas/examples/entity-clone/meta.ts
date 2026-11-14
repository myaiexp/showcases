// playcanvas example: Cloning entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cloning entities",
  summary: "clone() deep-copies an entity: name, tags, transform, components and children, outside the scene until you add it. A tagged totem is cloned and each copy keeps the snapshot of the original.",
  section: "Entity Component System",
  tags: ["clone","tags","addChild","Entity"],
  docs: ["repo/docs/user-manual/ecs/entities.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
