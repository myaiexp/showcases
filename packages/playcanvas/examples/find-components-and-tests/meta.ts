// playcanvas example: Finding by component or with a test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Finding by component or with a test",
  summary: "find and findOne take a function of your own, findComponents returns components, each with an entity property, and forEach visits every entity in a subtree.",
  section: "Entity Component System",
  tags: ["find","findOne","findComponent","findComponents","forEach"],
  docs: ["repo/docs/user-manual/ecs/searching-the-hierarchy.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
