// playcanvas example: The coordinate system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The coordinate system",
  summary: "PlayCanvas is right-handed with +Y up and -Z as an entity's forward. Drawn lines show the world axes and a turning ship's right, up and forward vectors, with live values.",
  section: "Entity Component System",
  tags: ["forward","right","up","setEulerAngles","Vec3.RIGHT","drawLine"],
  docs: ["repo/docs/user-manual/ecs/hierarchy-and-transformations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
