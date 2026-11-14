// Sortable.js example: every drag event, logged in the order it fires
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Event timeline',
  summary:
    'Drag a letter between an inbox and an archive and watch the log: pick up, drag start, each step, drop. Sortable reports every stage of a drag in a fixed order, so you can hook your own code into any of them.',
  section: 'Events',
  tags: ['onChoose', 'onUnchoose', 'onStart', 'onMove', 'onChange', 'onSort', 'onUpdate', 'onAdd', 'onRemove', 'onEnd', 'onClone'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
