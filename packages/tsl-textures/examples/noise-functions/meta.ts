// tsl-textures example: Noise functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise functions',
  summary:
    'noise() and noise3() are Perlin noise returning one or three values; fractal() and fractal3() stack octaves of it. Four spheres sample the same drifting position, with sliders for scale and the octave settings.',
  section: 'Utilities',
  tags: ['noise', 'noise3', 'fractal', 'fractal3', 'octaves', 'lacunarity'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
