// Spark example: PackedSplats.forEachSplat plus setSplat to recolour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Recolouring with forEachSplat',
  summary:
    'A hill of grey disc splats is visited with PackedSplats.forEachSplat, which unpacks every splat; the callback computes a new colour from its height or from its surface normal (the quaternion applied to the disc axis) and writes it back with setSplat. Choose "original" to restore the untouched bytes for a before/after comparison.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'forEachSplat', 'setSplat', 'needsUpdate', 'SplatMesh'],
  docs: ['repo/docs/docs/packed-splats.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
