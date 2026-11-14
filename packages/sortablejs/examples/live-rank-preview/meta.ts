// Sortable.js example: a "you're now #3" badge that follows the dragged row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live rank preview',
  summary:
    'Rank your favourite pizzas and a badge tells you where the one in your hand would land, updating step by step while you are still dragging, before you let go.',
  section: 'Events',
  tags: ['onChange', 'newIndex', 'onStart', 'onEnd'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
