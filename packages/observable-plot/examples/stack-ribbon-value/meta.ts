// observable-plot example: Stack: value order ribbon chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: value order ribbon chart',
  summary:
    'Order value sorts every stack on its own, so layers swap places as their ranks change over the years.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'order'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
