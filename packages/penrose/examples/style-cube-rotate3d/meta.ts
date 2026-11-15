// penrose example: rotate3d turns a cube about an axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rotate3d turns a cube about an axis',
  summary:
    'The matrix `rotate3d(theta, axis)` rotates 3D points by theta radians around a unit axis, and `matrixMultiplyList` applies it to the eight cube corners before `projectList` flattens them. The tabs spin the cube 0.7 radians about the y axis, the x axis and the diagonal (0.577, 0.577, 0.577).',
  section: 'Style: Vectors & Matrices',
  tags: ['rotate3d', 'matrixMultiplyList', 'projectList', 'axis', '3D'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
