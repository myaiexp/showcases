// observable-plot example: Stack: single bar of letter frequency
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: single bar of letter frequency',
  summary:
    'One horizontal bar split by letter frequency, with letters placed at the stackX midpoint. A compact alternative to a pie chart.',
  section: 'Transform: Stack',
  tags: ['barX', 'textX', 'stackX', 'percent'],
  docs: ['repo/docs/transforms/stack.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
