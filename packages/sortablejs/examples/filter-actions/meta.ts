// Sortable.js example: filter plus onFilter and Sortable.utils.is for in-row buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows with working delete and rename buttons',
  summary:
    'A file list you can reorder by dragging, whose rename and delete buttons still do their job on a simple click instead of starting a drag.',
  section: 'Dragging rules',
  tags: ['filter', 'onFilter', 'Sortable.utils.is', 'disabled'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
