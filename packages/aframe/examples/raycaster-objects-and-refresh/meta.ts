// aframe example: raycaster: objects: .clickable and refreshObjects()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: objects: .clickable and refreshObjects()",
  summary: "The raycaster tests only entities with the clickable class. With autoRefresh on, the list refreshes when entities are added or removed; a class change alone does not, so with autoRefresh: false the example toggles the class and then calls refreshObjects() by hand. Buttons do each step and the read-out lists intersectedEls.",
  section: 'Components',
  tags: ["raycaster", "objects", "autoRefresh", "refreshObjects", "intersectedEls", "classList", "class"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
