// Sortable.js example: the handle option so text stays selectable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Copyable text with a drag handle',
  summary:
    'A house-notes list with Wi-Fi and door codes you want to copy. A small grip does the dragging, so the text itself can still be selected. Untick the handle to see the difference.',
  section: 'Dragging rules',
  tags: ['handle', 'option()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
