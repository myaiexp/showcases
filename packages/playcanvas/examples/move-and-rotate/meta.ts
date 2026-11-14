// playcanvas example: Moving and rotating entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Moving and rotating entities",
  summary: "translate and translateLocal, rotate and rotateLocal, and lookAt, each applied every frame scaled by dt, on a ship that is yawed and rolled so world and local axes differ.",
  section: "Entity Component System",
  tags: ["translate","translateLocal","rotate","rotateLocal","lookAt"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
