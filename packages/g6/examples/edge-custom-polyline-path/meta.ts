// g6 example: Custom edge: a stepped path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom edge: a stepped path',
  summary:
    'A BaseEdge subclass whose getKeyPath builds a three-segment step from getEndpoints, between two nodes with ports.',
  section: 'Edge',
  tags: ['register', 'BaseEdge', 'getKeyPath', 'getEndpoints', 'ports'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/custom-edge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
