// playcanvas example: Aiming a camera entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aiming a camera entity",
  summary:
    "A camera is just an entity with a camera component: move it with setPosition and aim its negative Z axis with lookAt. This one circles a cone of scenery on a sine path; the full view changes the radius, height, lookAt target and speed.",
  section: "Graphics: Cameras",
  tags: ["CameraComponent","clearColor","setPosition","lookAt"],
  docs: ["repo/docs/user-manual/graphics/cameras/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
