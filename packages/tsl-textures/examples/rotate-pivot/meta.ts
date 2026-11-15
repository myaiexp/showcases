// tsl-textures example: rotatePivot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rotatePivot',
  summary:
    'rotatePivot(vector, pivot, angle) turns a point by Euler angles around a pivot. In positionNode a cube turns about a movable pivot, with an optional twist that grows with height.',
  section: 'Utilities',
  tags: ['rotatePivot', 'positionNode', 'pivot', 'angle'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
