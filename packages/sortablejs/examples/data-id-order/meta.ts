// Sortable.js example: the order a server would receive, read from custom ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Order for the server',
  summary:
    'A course outline whose lessons carry database ids. After every drop, the exact list your server would be sent updates beside it, read from a custom attribute instead of the visible text.',
  section: 'Methods',
  tags: ['dataIdAttr', 'toArray()', 'onSort'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
