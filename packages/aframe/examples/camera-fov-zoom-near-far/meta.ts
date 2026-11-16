// aframe example: camera: fov, zoom, near and far
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "camera: fov, zoom, near and far",
  summary: "fov and zoom change how much of the scene the camera frames, and near and far clip it: objects closer than near or beyond far disappear. A row of pillars recedes down a corridor; sliders move the properties, and the card animates fov and far.",
  section: 'Components',
  tags: ["camera", "fov", "zoom", "near", "far", "animation", "camera.fov"],
  docs: ["repo/docs/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
