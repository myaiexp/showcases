// g6 example: Optimize viewport transform: debounce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Optimize viewport transform: debounce',
  summary: 'debounce sets how many milliseconds after the view stops moving the hidden edges are drawn again. A slider changes it; the card pans with 100 ms and 1500 ms.',
  section: 'Behavior',
  tags: ['optimize-viewport-transform', 'debounce', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/OptimizeViewportTransform.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
