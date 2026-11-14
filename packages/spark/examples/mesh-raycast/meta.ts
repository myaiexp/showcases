// Spark example: THREE.Raycaster against a SplatMesh, marking the hit and distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raycasting a SplatMesh',
  summary:
    'SplatMesh implements raycast(), so THREE.Raycaster.intersectObjects finds splats like any mesh. Click the knot to drop a marker on the hit point and read the distance; raycastable and minRaycastOpacity change what counts as a hit. The card fires a ray at a new point every half second.',
  section: 'SplatMesh',
  tags: ['raycast', 'THREE.Raycaster', 'raycastable', 'minRaycastOpacity'],
  docs: ['repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
