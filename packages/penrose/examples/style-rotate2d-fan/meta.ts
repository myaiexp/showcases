// penrose example: rotate2d turns a blade into a fan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rotate2d turns a blade into a fan',
  summary:
    'The matrix `rotate2d(theta)` turns points around the origin. Six blades each use `rotate2d(match_id * step)` on the same triangle, so a step of 1.047 radians closes the circle into a pinwheel and other steps open it into a spiral.',
  section: 'Style: Vectors & Matrices',
  tags: ['rotate2d', 'matrix', 'matrixMultiplyList', 'Polygon', 'hsva'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
