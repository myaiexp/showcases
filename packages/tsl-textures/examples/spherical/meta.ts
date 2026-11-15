// tsl-textures example: spherical
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'spherical',
  summary:
    'spherical(phi, theta) returns a point on the unit sphere. The uv of a plane becomes the two angles, so positionNode folds the plane into a sphere; a blend slider moves between the two.',
  section: 'Utilities',
  tags: ['spherical', 'positionNode', 'uv', 'phi', 'theta'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
