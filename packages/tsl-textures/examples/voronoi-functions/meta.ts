// tsl-textures example: Voronoi functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voronoi functions',
  summary:
    'voronoi() returns the distance to the nearest feature point, voronoi2() the nearest two, voronoi3() three distances. Side by side with a jitter slider from a regular grid to scattered points.',
  section: 'Utilities',
  tags: ['voronoi', 'voronoi2', 'voronoi3', 'jitter', 'worley'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
