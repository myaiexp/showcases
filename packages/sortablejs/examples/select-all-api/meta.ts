// Sortable.js example: an inbox with Select all, Clear and a live count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select all and clear in an inbox',
  summary:
    'An inbox with "Select all" and "Clear" buttons and a live "3 selected" count. The buttons pick and unpick mails from code, and taps keep working alongside them.',
  section: 'MultiDrag',
  tags: ['Sortable.utils.select', 'Sortable.utils.deselect', 'onSelect', 'onDeselect', 'avoidImplicitDeselect'],
  docs: ['repo/plugins/MultiDrag/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
