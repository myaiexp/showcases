// aframe example: Local and world coordinates: foo at 1 2 3, bar at 2 3 4
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Local and world coordinates: a child of a moving parent',
  summary:
    'A child entity under a rotating parent keeps its local position while getWorldPosition and getWorldQuaternion follow it. A world point is moved into the parent\'s space with the inverse world matrix. The docs\' getInverse and applyMatrix no longer exist in three.js; copy().invert() and applyMatrix4() replace them.',
  section: 'Introduction',
  tags: ['getWorldPosition', 'getWorldQuaternion', 'localToWorld', 'matrixWorld', 'THREE.Matrix4', 'coordinate spaces'],
  docs: ['repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
