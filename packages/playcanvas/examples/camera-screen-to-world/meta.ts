// playcanvas example: Screen to world
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Screen to world",
  summary:
    "A point on screen, from the pointer or a sweeping path, becomes a ray with screenToWorld at the near and far clip distances, and a marker sits at a chosen distance along it. A second camera watches the ray from the side.",
  section: "Graphics: Cameras",
  tags: ["screenToWorld","nearClip","farClip","drawLine"],
  docs: ["repo/docs/user-manual/graphics/cameras/screen-and-world.md","repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
