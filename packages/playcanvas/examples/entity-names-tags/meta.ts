// playcanvas example: Entity names and tags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Entity names and tags",
  summary: "Names need not be unique and tags group entities. A tag drives a colour here: tags.add, tags.remove, tags.list and tags.has change goblins into bosses and fliers, and rename changes an entity's name.",
  section: "Entity Component System",
  tags: ["name","tags.add","tags.remove","tags.list","tags.has"],
  docs: ["repo/docs/user-manual/ecs/entities.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
