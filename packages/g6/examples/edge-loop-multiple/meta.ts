// g6 example: Several self-loops on one node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Several self-loops on one node',
  summary:
    'Three loops on one node, each placed and coloured by a function of its edge id, with loopClockwise to flip their direction.',
  section: 'Edge',
  tags: ['loopPlacement', 'loopDist', 'loopClockwise', 'stroke callback'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
