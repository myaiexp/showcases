// playcanvas example: Entities, components and systems
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Entities, components and systems",
  summary: "A camera, a light and a car with a body and two wheels: the scene tree under app.root, each entity's components in entity.c, and the systems that run them, printed beside a spinning car.",
  section: "Entity Component System",
  tags: ["Entity","app.root","addComponent","app.systems","entity.c"],
  docs: ["repo/docs/user-manual/ecs/index.md","repo/docs/user-manual/ecs/entities.md","repo/docs/user-manual/ecs/components.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
