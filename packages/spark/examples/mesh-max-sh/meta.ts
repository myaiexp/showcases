// Spark example: SplatMesh.maxSh on a mesh whose PackedSplats carry extra.sh1 data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spherical harmonics and maxSh',
  summary:
    'Two grey spheres whose PackedSplats carry hand-packed first-order spherical harmonics in extra.sh1 (nine signed 7-bit values per splat, as the docs lay out). One tints as the view direction changes; the other has maxSh 0 and stays grey. The select sets the tinted sphere’s maxSh: there is no sh2 or sh3 data, so 1, 2 and 3 look the same.',
  section: 'SplatMesh',
  tags: ['maxSh', 'extra.sh1', 'PackedSplats', 'ensureSplatsSh'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
