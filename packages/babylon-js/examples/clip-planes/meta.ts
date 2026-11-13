// babylon-js example: Clip planes on the scene and per material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clip planes on the scene and per material",
  summary:
    "scene.clipPlane slices the whole scene at a movable height and clipPlane2 cuts along x; material.clipPlane clips only one mesh. Meshes are two-sided so the cut shows their insides.",
  section: "Scene",
  tags: ['clipPlane', 'clipPlane2', 'Plane', 'material.clipPlane', 'Scene'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/clipPlanes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
