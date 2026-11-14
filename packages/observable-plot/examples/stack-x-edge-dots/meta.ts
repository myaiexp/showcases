// observable-plot example: Stack: stackX bars with edge dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: stackX bars with edge dots',
  summary:
    'Revenue stacked horizontally by year with stackX; white dots at the right edge of each segment come from stackX2.',
  section: 'Transform: Stack',
  tags: ['barX', 'dot', 'stackX', 'stackX2'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
