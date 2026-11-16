// aframe example: Writing a component: a box that makes three.js geometry and material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: a box that makes three.js geometry and material',
  summary:
    'The docs\' box component builds a THREE.Mesh in init and attaches it with setObject3D, rebuilds geometry or recolours the material in update when properties change, and removes the mesh in remove. Sliders change width and height.',
  section: 'Introduction',
  tags: ['setObject3D', 'getObject3D', 'removeObject3D', 'THREE.BoxGeometry', 'THREE.MeshStandardMaterial', 'update'],
  docs: ['repo/docs/introduction/writing-a-component.md', 'repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
