// g6 example: Optimize viewport transform: hide edges while moving
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Optimize viewport transform: hide edges while moving',
  summary: 'optimize-viewport-transform hides edges and combos during a drag or zoom and shows them again after the view settles, keeping large graphs smooth. A toggle turns it off; the card pans a 100-node graph.',
  section: 'Behavior',
  tags: ['optimize-viewport-transform', 'enable', 'translateBy'],
  docs: ['repo/packages/site/docs/manual/behavior/OptimizeViewportTransform.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
