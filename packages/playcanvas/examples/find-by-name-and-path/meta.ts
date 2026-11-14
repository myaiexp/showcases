// playcanvas example: Finding entities by name and path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Finding entities by name and path",
  summary: "findByName returns the first match and find('name', ...) returns all of them; findByPath picks out one entity by its route and returns null when nothing matches. Matches glow in a small town.",
  section: "Entity Component System",
  tags: ["findByName","find","findByPath","path"],
  docs: ["repo/docs/user-manual/ecs/searching-the-hierarchy.md","repo/docs/user-manual/ecs/entities.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
