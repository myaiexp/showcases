// penrose example: unitRandom() colour channels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'unitRandom() colour channels',
  summary:
    'Each square\'s `fillColor` is `rgba(unitRandom(), unitRandom(), unitRandom(), 0.9)`: every call is its own constant in [0, 1), so every square and every variation gets a new colour.',
  section: 'Random Sampling',
  tags: ['unitRandom', 'fillColor', 'rgba', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
