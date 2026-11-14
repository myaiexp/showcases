// g6 example: Optimize viewport transform: enable by graph size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Optimize viewport transform: enable by graph size',
  summary: 'A behavior given as a function reads the graph and enables optimize-viewport-transform only above 100 elements; changing the data re-applies the behaviors. The card swaps a small and a large graph and pans each.',
  section: 'Behavior',
  tags: ['optimize-viewport-transform', 'behaviors', 'function', 'setBehaviors', 'enable'],
  docs: ['repo/packages/site/docs/manual/behavior/OptimizeViewportTransform.en.md', 'repo/packages/site/docs/api/behavior.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
