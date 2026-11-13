// Sortable.js example: a drag-handle priority list with a live order readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reorderable list',
  summary:
    'Drag rows by their handle to reorder a priority list. Sortable animates the shift and fires onSort, which drives the live order readout.',
  section: 'Basics',
  tags: ['list', 'handle', 'onSort'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
