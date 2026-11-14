// observable-plot example: Vector: Perlin noise field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector: Perlin noise field',
  summary:
    'Poisson-disk sampled points carry no x or y channel (the data are pairs) and take length and rotate from a two-octave Perlin noise function. A drift slider slides the field through the noise; the docs plot is the drift 0, 4000 point case.',
  section: 'Mark: Vector',
  tags: ['vector', 'rotate', 'length', 'axis', 'aspectRatio'],
  docs: ['repo/docs/marks/vector.md', 'repo/docs/components/perlin.js', 'repo/docs/components/poisson.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
