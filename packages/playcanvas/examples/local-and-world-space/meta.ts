// playcanvas example: Local and world transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Local and world transforms",
  summary: "A wheel on a car, read and set in both spaces. Local values stay put as the car drives; world values change; setPosition on the wheel rewrites its local position.",
  section: "Entity Component System",
  tags: ["getLocalPosition","getPosition","setPosition","setLocalPosition","setLocalScale"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
