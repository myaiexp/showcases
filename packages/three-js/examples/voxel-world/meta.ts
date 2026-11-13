// Three.js example: voxel terrain meshed into one BufferGeometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voxel geometry',
  summary:
    'A 32x32x32 chunk of generated hills is meshed by hand: only faces without a neighbouring voxel are written into one indexed BufferGeometry. Toggle the culling to see how many faces it saves.',
  section: 'Solutions',
  tags: ['BufferGeometry', 'BufferAttribute', 'setIndex', 'vertexColors', 'voxels'],
  docs: ['repo/manual/pages/voxel-geometry.html', 'repo/docs/pages/BufferGeometry.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
