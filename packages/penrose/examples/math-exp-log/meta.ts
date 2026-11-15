// penrose example: exp and log as mirror curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'exp and log as mirror curves',
  summary:
    'The curve `exp(k x)` and `log(x) / k` are inverses, so they mirror each other across the dashed diagonal. `k` is sampled, which changes how steeply the pair bends.',
  section: 'Computation: Math',
  tags: ['exp', 'log'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
