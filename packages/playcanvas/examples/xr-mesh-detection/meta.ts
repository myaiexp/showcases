// playcanvas example: Mesh detection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh detection',
  summary:
    "Mesh detection hands the app real-world geometry as XrMeshes: vertices and indices in local space, a pose and a semantic label. A simulated scan reconstructs a floor row by row, then finds a table and a screen. Each XrMesh becomes a pc.Mesh through setPositions, calculateNormals, setIndices and update, drawn as a wireframe coloured by label, and rebuilt on change. In an AR session started with meshDetection: true, real meshes arrive through the same add handler.",
  section: 'XR',
  tags: ['XrMeshDetection', 'XrMesh', 'vertices', 'indices', 'label', 'calculateNormals', 'meshDetection: true', 'RENDERSTYLE_WIREFRAME'],
  docs: ['repo/docs/user-manual/xr/ar/mesh-detection.md', 'repo/docs/user-manual/xr/ar/plane-detection.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
