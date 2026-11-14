// playcanvas example: Camera controls script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera controls script",
  summary:
    "The engine's ready-made camera-controls script on a camera entity: orbit, fly (WASD plus right-drag look) and pan, with mouse, touch and gamepad. The full view sets the buttons, enable flags, groundPan and speeds; cards drive the script's focus() glide between landmarks.",
  section: "Graphics: Cameras",
  tags: ["CameraControls","focusPoint","leftButton","groundPan","focus","script component"],
  docs: ["repo/docs/user-manual/graphics/cameras/camera-controls.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
