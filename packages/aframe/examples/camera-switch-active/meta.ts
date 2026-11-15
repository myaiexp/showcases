// aframe example: camera: change the active camera with setAttribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "camera: change the active camera with setAttribute",
  summary: "Three cameras sit in one scene, and exactly one renders. Setting camera=active: true on another one hands the renderer over to it, as the docs show with secondCameraEl.setAttribute('camera', 'active', true). Buttons choose the camera; the card cycles through them.",
  section: 'Components',
  tags: ["camera", "active", "setAttribute", "a-entity", "scene.camera"],
  docs: ["repo/docs/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
