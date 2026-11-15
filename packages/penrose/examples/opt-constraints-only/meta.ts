// penrose example: A problem with constraints and no objective
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A problem with constraints and no objective',
  summary:
    'With no objective, the optimizer only has to satisfy `2 - y <= 0` and `y - 5 <= 0`. It stops as soon as every constraint is at or below 0, so where the point ends up inside [2, 5] depends on where it started. The curve is the penalty the optimizer actually minimizes.',
  section: 'Optimization API',
  tags: ['constraints', 'problem', 'converged', 'sub', 'run'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
