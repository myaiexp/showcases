// observable-plot example: Tip: paired x1 x2 and y1 y2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: paired x1 x2 and y1 y2',
  summary:
    'A histogram tip shows the weight as a range and the frequency as the length between y1 and y2, even when the stack is mirrored below zero.',
  section: 'Mark: Tip',
  tags: ['tip', 'rectY', 'binX', 'stack', 'x1', 'x2'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
