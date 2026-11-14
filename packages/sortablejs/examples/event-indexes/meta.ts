// Sortable.js example: row numbers versus item numbers when dividers are in the list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Event indexes',
  summary:
    'A weekend schedule with time-of-day dividers between the activities. A plain-language readout of each drop shows the two ways Sortable counts positions: every row, or only the draggable items.',
  section: 'Events',
  tags: ['oldIndex', 'newIndex', 'oldDraggableIndex', 'newDraggableIndex', 'from', 'to', 'pullMode', 'draggable'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
