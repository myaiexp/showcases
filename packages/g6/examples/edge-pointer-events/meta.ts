// g6 example: Edge hit testing and pointer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge hit testing and pointer events',
  summary:
    'Thin edges made easier to hit with increasedLineWidthForHitTesting, and pointerEvents none or stroke on the lower edge. Hover and click events are logged in the full view.',
  section: 'Edge',
  tags: ['increasedLineWidthForHitTesting', 'pointerEvents', 'cursor', 'edge:pointerenter', 'edge:click'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
