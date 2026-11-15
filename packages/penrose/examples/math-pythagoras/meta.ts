// penrose example: sqrt, sqr and norm on a right triangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sqrt, sqr and norm on a right triangle',
  summary:
    'The legs `a` and `b` are sampled. The hypotenuse length `sqrt(sqr(a) + sqr(b))` is the radius of the arc that swings it down onto the base line, and `norm` of the hypotenuse vector agrees: both end at the red dot.',
  section: 'Computation: Math',
  tags: ['sqrt', 'sqr', 'norm', 'normsq', 'angleOf'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
