// playcanvas example: Camera projection, fov and orthoHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera projection, fov and orthoHeight",
  summary: "A camera is perspective, with a field of view, or orthographic, with a half height. Identical pillars at growing distance shrink in perspective and stay the same size in orthographic; the full view switches projection and moves fov, orthoHeight and horizontalFov.",
  section: "Components",
  tags: ["CameraComponent","projection","fov","orthoHeight","horizontalFov","PROJECTION_ORTHOGRAPHIC"],
  docs: ["repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
