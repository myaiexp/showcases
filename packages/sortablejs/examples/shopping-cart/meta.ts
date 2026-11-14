// Sortable.js example: a shelf and a cart that keep a running total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shopping cart',
  summary:
    'Drag groceries from the shelf into the cart and the total and item count follow. Take something back out and they drop again: each list is told when an item arrives and when one leaves.',
  section: 'Events',
  tags: ['onAdd', 'onRemove', 'group', 'evt.item'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
