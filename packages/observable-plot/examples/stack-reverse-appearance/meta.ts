// observable-plot example: Stack: reverse with appearance order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: reverse with appearance order',
  summary:
    'Appearance order stacks layers by where each peaks. The reverse option flips it so layers enter from the bottom instead of the top.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'order', 'reverse'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
