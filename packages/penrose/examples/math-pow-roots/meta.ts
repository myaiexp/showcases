// penrose example: pow, sqrt, cbrt and sqr
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'pow, sqrt, cbrt and sqr',
  summary:
    'The curve `pow(x, p)` uses a sampled exponent `p`; beside it `sqr`, `sqrt` and `cbrt` give the fixed square, square root and cube root. Where `p` is below 1 the sampled curve runs with the roots, above 1 with the square.',
  section: 'Computation: Math',
  tags: ['pow', 'sqrt', 'cbrt', 'sqr'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
