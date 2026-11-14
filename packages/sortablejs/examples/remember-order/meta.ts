// Sortable.js example: a ranking that is still in your order after a reload
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Remember the order',
  summary:
    'Rank your favourite albums, press Reload, and the list is rebuilt from scratch yet comes back in your order: the arrangement is saved in the browser after every drop and restored when the list is created.',
  section: 'Store',
  tags: ['store', 'get', 'set', 'localStorage', 'group.name'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
