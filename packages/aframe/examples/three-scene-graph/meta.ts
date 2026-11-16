// aframe example: A-Frame entities and the three.js scene graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A-Frame entities and the three.js scene graph',
  summary:
    'A box with a sphere and a light as children becomes a THREE.Mesh holding a Mesh and a Light under the scene. The board prints scene.object3D as a tree and shows each object\'s el back to its entity.',
  section: 'Introduction',
  tags: ['object3D', 'three.js scene graph', 'parent-child', 'el'],
  docs: ['repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
