// g6 example: Custom edge: a line on BaseEdge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom edge: a line on BaseEdge',
  summary:
    'A custom edge registered under a showcase- name that extends BaseEdge and returns its own path from getKeyPath.',
  section: 'Edge',
  tags: ['register', 'BaseEdge', 'getKeyPath', 'getKeyStyle'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/custom-edge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
