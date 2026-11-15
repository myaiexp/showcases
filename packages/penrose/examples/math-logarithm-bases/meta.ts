// penrose example: log2, log10, log1p and expm1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'log2, log10, log1p and expm1',
  summary:
    'Four curves over the same sample points: `log2` and `log10` differ only by a constant factor, while `log1p(x)` and `expm1(x)` are `log(1 + x)` and `exp(x) - 1` computed to stay accurate near zero. The vertical scale is sampled.',
  section: 'Computation: Math',
  tags: ['log2', 'log10', 'log1p', 'expm1'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
