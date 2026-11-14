// Sortable.js example: table templates that hand out numbered copies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numbered copies',
  summary:
    'A seating-plan palette hands out copies of "Round table" and "Long table". Each copy that reaches the floor plan gets its own number, so you end up with Round table 1, Round table 2 and so on.',
  section: 'Events',
  tags: ['onClone', 'onAdd', 'onEnd', 'pull: clone', 'evt.item', 'evt.clone'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
