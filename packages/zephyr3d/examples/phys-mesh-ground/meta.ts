// zephyr3d example: Mesh collider on rolling ground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh collider on rolling ground',
  summary:
    'A Collider with shape \'mesh\' uses the node\'s own triangles: balls roll over generated rolling hills. The readout shows collider.ready, which turns true once the triangles are read back from the GPU.',
  section: 'Physics',
  tags: ['Collider', 'mesh', 'ready', 'Primitive'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
