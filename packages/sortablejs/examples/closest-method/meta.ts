// Sortable.js example: one click handler that finds which row a click belongs to
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which row was clicked',
  summary:
    'A guest list with a "+1" and a remove button on every row, all handled by a single listener on the list. Sortable works out which guest a click landed on, even when it hit a button or icon deep inside the row.',
  section: 'Methods',
  tags: ['closest()', 'event delegation', 'draggable'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
