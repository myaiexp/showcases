// penrose example: lookAt places the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'lookAt places the camera',
  summary:
    'The matrix `lookAt(eye, center, up)` aims a camera at the cube from the eye point, and `perspective` and `projectList` flatten the cube onto the canvas. The tabs move the eye to a corner, to the side and high above, and a red dot follows the cube corner (1, 1, 1) through `project`.',
  section: 'Style: Vectors & Matrices',
  tags: ['lookAt', 'perspective', 'projectList', 'project', 'camera', '3D'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
