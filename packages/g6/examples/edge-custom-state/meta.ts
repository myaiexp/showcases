// g6 example: Custom edge: state-aware key style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom edge: state-aware key style',
  summary:
    'A custom edge branches on attributes.states in getKeyStyle to glow when selected; click an edge in the full view.',
  section: 'Edge',
  tags: ['register', 'BaseEdge', 'getKeyStyle', 'states', 'setElementState'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/custom-edge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
