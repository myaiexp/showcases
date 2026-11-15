// penrose example: sinh, cosh and tanh curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sinh, cosh and tanh curves',
  summary:
    'Seventeen sample points feed `sinh`, `cosh` and `tanh`, joined into three curves. The horizontal stretch is sampled, so every variation spreads the same curves over a different width; `cosh` is the even U shape, `sinh` the odd S and `tanh` flattens at 1.',
  section: 'Computation: Math',
  tags: ['sinh', 'cosh', 'tanh'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
