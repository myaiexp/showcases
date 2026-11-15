// penrose example: diskRandom() inside a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'diskRandom() inside a circle',
  summary:
    '`diskRandom()` is a point sampled uniformly from the unit disk, so `120 * diskRandom()` fills a disk of radius 120 evenly, with no crowding at the centre. A dashed ring marks the disk.',
  section: 'Random Sampling',
  tags: ['diskRandom', 'Circle', 'center', 'vector'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/random-sampling.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
