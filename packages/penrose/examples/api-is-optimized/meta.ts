// penrose example: isOptimized before and after optimize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'isOptimized before and after optimize',
  summary:
    'Left, the state `compile` returns: every unknown is a random first sample, so circles overlap at random and `isOptimized` is false. Right, the same state after `optimize`: the subset circles nest, labels sit inside, and `isOptimized` is true.',
  section: 'Language API',
  tags: ['isOptimized', 'optimize', 'compile', 'toSVG'],
  docs: ['repo/packages/docs-site/docs/ref/api.md', 'repo/packages/core/src/index.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
