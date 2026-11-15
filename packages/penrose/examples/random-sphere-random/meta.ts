// penrose example: sphereRandom() seen from the side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sphereRandom() seen from the side',
  summary:
    '`sphereRandom()` returns a 3D unit vector. Dropping its z leaves a flat picture of a ball of points, and `d.p[2]` sets each dot\'s radius, so points nearer the viewer are bigger and the rim looks denser than the middle.',
  section: 'Random Sampling',
  tags: ['sphereRandom', 'Circle', 'vector', 'projection'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/random-sampling.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
