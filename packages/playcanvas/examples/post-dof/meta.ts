// playcanvas example: CameraFrame depth of field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame depth of field',
  summary:
    'The depth-of-field effect blurs everything outside a focal plane: six spheres recede from the camera while focusDistance racks along the row, with focusRange the sharp zone around it. The full view stops the rack and sets the blur radius, ring and point counts, near blur and the half or full resolution blur.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'dof.enabled', 'dof.focusDistance', 'dof.focusRange', 'dof.blurRadius', 'dof.blurRings', 'dof.nearBlur', 'dof.highQuality'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md', 'repo/docs/user-manual/graphics/posteffects/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
