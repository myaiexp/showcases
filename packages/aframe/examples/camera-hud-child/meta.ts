// aframe example: camera: entities fixed to the camera (a HUD)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "camera: entities fixed to the camera (a HUD)",
  summary: "A plane and a ring that are children of the camera entity stay in view however you look. Drag to turn the camera: the world slides past while the grey panel and a small reticle stay put 1 metre in front of it. The docs advise using this sparingly in VR.",
  section: 'Components',
  tags: ["camera", "look-controls", "children", "HUD", "position", "material", "opacity"],
  docs: ["repo/docs/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
