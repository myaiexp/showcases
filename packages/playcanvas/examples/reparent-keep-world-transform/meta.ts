// playcanvas example: Reparenting and keeping the world transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reparenting and keeping the world transform",
  summary: "A wheel moves between a car and a trailer. addChild keeps its local transform, so it jumps; saving getPosition and getRotation first and setting them after keeps it in place. insertChild picks the order.",
  section: "Entity Component System",
  tags: ["addChild","insertChild","getPosition","setPosition","getRotation","setRotation"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
