// penrose example: randomIndex(min, max)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'randomIndex(min, max)',
  summary:
    '`randomIndex(1, 5)` is an integer from 1 up to 4, so `r : 14 * randomIndex(1, 5)` gives radii in four steps (14, 28, 42, 56) and equal-looking discs recur across variations, unlike the continuous `random`.',
  section: 'Random Sampling',
  tags: ['randomIndex', 'Circle', 'r'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
