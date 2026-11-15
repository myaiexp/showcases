// tsl-textures example: Watermelon in screen space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Watermelon in screen space',
  summary:
    'watermelon() with uvs set to the TSL screenUV node, as the docs suggest for flat surfaces: the stripes now follow the screen instead of the model\'s positions, so a plane shows them undistorted. Orbit the camera to see them stay put.',
  section: 'Textures',
  tags: ['watermelon', 'colorNode', 'uvs', 'screenUV', 'plane'],
  docs: ['repo/docs/watermelon.md', 'repo/src/watermelon.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
