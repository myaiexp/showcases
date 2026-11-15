// penrose example: Many variables: points spreading on a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Many variables: points spreading on a circle',
  summary:
    'Each point is a pair of variables. A constraint holds every point at distance R from the centre, and the objective, a sum of `1 / distance²` over all pairs, pushes the points apart, so they spread around the ring. The slider sets how many points there are.',
  section: 'Optimization API',
  tags: ['ops.vnorm', 'ops.vdistsq', 'inverse', 'addN', 'absVal', 'constraints', 'objective'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
