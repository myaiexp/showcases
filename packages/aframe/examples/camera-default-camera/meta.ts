// aframe example: camera: the injected default camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "camera: the injected default camera",
  summary: "With no camera in the markup, A-Frame injects one with data-aframe-default-camera, look-controls, wasd-controls and a position of 0 1.6 0. Adding a camera entity of your own, which defaults to active, takes over rendering. The read-out inspects the scene's active camera and its components, and a button adds a camera of your own.",
  section: 'Components',
  tags: ["camera", "data-aframe-default-camera", "look-controls", "wasd-controls", "position", "scene.camera"],
  docs: ["repo/docs/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
