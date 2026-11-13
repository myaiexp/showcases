// Adapters example: getInstances() and commitChanges() on an InstancedMesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: per-instance proxies on InstancedMesh',
  summary: 'getInstances() turns an InstancedMesh of cubes into an array of proxies, which one animate() call spreads, scales and recolors with a 3D stagger grid. The full view adds commitChanges() to read the instance matrix and a scale: 0 hide.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'InstancedMesh', 'getInstances', 'commitChanges', 'stagger', 'grid'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
