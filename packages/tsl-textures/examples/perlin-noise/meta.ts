// tsl-textures example: Perlin noise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Perlin noise',
  summary:
    'perlinNoise() on a colorNode: Perlin noise splitting a colour from a background, with scale, balance (how much of each), contrast (edge sharpness), both colours and the seed live, plus the docs page\'s three snapshots.',
  section: 'Textures',
  tags: ['perlinNoise', 'colorNode', 'balance', 'contrast'],
  docs: ['repo/docs/perlin-noise.md', 'repo/src/perlin-noise.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
