// aframe example: Changing position, rotation, scale and visible on object3D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Changing position, rotation, scale and visible on object3D',
  summary:
    'Steps through the docs\' object3D calls (position.set, rotation.y with degToRad, scale.set, visible) on a box, and logs that getAttribute still reports the new position.',
  section: 'Introduction',
  tags: ['object3D.position', 'object3D.rotation', 'object3D.scale', 'object3D.visible', 'THREE.MathUtils.degToRad'],
  docs: ['repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
