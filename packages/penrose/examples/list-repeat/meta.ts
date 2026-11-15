// penrose example: repeat: n copies of one number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'repeat: n copies of one number',
  summary:
    '`repeat(n, k)` returns a list of `n` copies of `k`, so `repeat(2, k)` is the diagonal point (k, k) (the dots in the corner) and `repeat(5, h)` is a vector that, added to a five-number vector of sampled heights (a list in square brackets will not add), lifts every bar by the same sampled `h`.',
  section: 'Computation: Colors & Sampling',
  tags: ['repeat', 'vmul'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
