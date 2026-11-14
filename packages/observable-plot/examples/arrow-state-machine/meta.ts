// observable-plot example: Arrow: finite state machine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arrow: finite state machine',
  summary:
    'Directed graph edges as bent arrows between three nodes, stroke width set by transition weight, with inset keeping them off the node dots.',
  section: 'Mark: Arrow',
  tags: ['arrow', 'dot', 'text', 'strokeWidth', 'headLength'],
  docs: ['repo/docs/marks/arrow.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
