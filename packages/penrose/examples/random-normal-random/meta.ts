// penrose example: normalRandom() scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'normalRandom() scatter',
  summary:
    'Each dot sits at `(40 * normalRandom(), 28 * normalRandom())`: a draw from a normal distribution with mean 0 and standard deviation 1, scaled to a wide, flat cloud. Dense in the middle and sparse at the edges, differently every variation.',
  section: 'Random Sampling',
  tags: ['normalRandom', 'Circle', 'center', 'distribution'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
