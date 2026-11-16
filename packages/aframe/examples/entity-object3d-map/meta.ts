// aframe example: setObject3D, getObject3D, removeObject3D and the object3dset event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setObject3D, getObject3D, removeObject3D and the object3dset event',
  summary:
    'Sets a THREE.Mesh on an empty entity under the name mesh, reads it back, then removes it. The object3DMap keys and the object3dset and object3dremove events are logged on a board in the scene.',
  section: 'Core API',
  tags: ['setObject3D', 'getObject3D', 'removeObject3D', 'object3DMap', 'object3dset'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
