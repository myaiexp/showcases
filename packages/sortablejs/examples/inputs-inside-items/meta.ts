// Sortable.js example: filter as a function with preventOnFilter false for form fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quantity fields inside draggable rows',
  summary:
    'A shopping basket you can reorder, where each row has a quantity box you can click and type in. Pressing a field edits it instead of dragging the row, and the total follows.',
  section: 'Dragging rules',
  tags: ['filter', 'preventOnFilter', 'filter: function'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
