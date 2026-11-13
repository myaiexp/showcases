// Three.js example: HTML labels aligned to 3D objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aligning HTML labels to 3D',
  summary:
    'DOM labels follow rotating cubes by projecting each world position to normalised device coordinates. A raycast hides labels of occluded cubes, and a depth check hides those outside the frustum.',
  section: 'Solutions',
  tags: ['Vector3.project', 'Raycaster', 'OrbitControls', 'HTML overlay'],
  docs: [
    'repo/manual/pages/align-html-elements-to-3d.html',
    'repo/manual/pages/picking.html',
    'repo/docs/pages/Raycaster.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
