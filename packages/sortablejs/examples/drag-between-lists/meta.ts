// Sortable.js example: a three-column task board sharing one group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag between lists',
  summary:
    'A task board: drag a card from "To do" into "Doing" or "Done". Columns that share a group name trade items, and each column\'s count updates as cards arrive and leave.',
  section: 'Groups',
  tags: ['group', 'kanban', 'onSort'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-06-14',
});
