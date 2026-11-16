// aframe example: camera: a rig, local position and world position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "camera: a rig, local position and world position",
  summary: "The camera is a child of a rig entity that glides in a circle. A rotation-reader component on the camera reads object3D.position (local, always 0 1.6 0) and getWorldPosition/getWorldQuaternion (world, following the rig), as in the docs, with vectors allocated once.",
  section: 'Components',
  tags: ["camera", "rig", "object3D.position", "getWorldPosition", "getWorldQuaternion", "registerComponent", "tick"],
  docs: ["repo/docs/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
