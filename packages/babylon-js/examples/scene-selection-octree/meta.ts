// babylon-js example: Selection octree and active meshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Selection octree and active meshes",
  summary:
    "A field of 900 static instances is viewed through a narrow camera; scene.createOrUpdateSelectionOctree with adjustable capacity and depth, and octree.dynamicContent for a moving mesh, change how the active meshes are chosen. The active mesh count and evaluation time are read out.",
  section: "Scene",
  tags: ['createOrUpdateSelectionOctree', 'Octree', 'dynamicContent', 'getActiveMeshes', 'SceneInstrumentation'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/optimizeOctrees.md',
    'repo/content/features/featuresDeepDive/scene/optimize_your_scene.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
