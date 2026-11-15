// penrose example: quadraticCurveFromPoints chains smooth quadratics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'quadraticCurveFromPoints chains smooth quadratics',
  summary:
    'The first three points of `quadraticCurveFromPoints` are a start, a control point (red) and an end; every point after that is just an end, and each quadratic reflects the previous control point to stay smooth. The sampled control height changes the whole wave. "closed" adds the final closing line and a fill.',
  section: 'Computation: Paths & Curves',
  tags: ['quadraticCurveFromPoints', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
