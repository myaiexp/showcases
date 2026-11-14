// g6 example: Self-loop edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Self-loop edge',
  summary:
    'An edge from a node to itself: loopPlacement chooses the side, loopDist the size, and loop turns self-loops on or off.',
  section: 'Edge',
  tags: ['loop', 'loopPlacement', 'loopDist'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
