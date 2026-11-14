// playcanvas example: Scale and skew in a hierarchy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale and skew in a hierarchy",
  summary: "Scale multiplies everything below an entity. Stretching a parent stretches its children and shears them once they turn, while the same stretch on a leaf entity under an unscaled parent leaves its neighbour intact.",
  section: "Entity Component System",
  tags: ["setLocalScale","getScale","non-uniform scale"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
