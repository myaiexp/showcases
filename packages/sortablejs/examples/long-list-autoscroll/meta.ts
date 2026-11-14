// Sortable.js example: a long list that scrolls itself during a drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll a long list while you drag',
  summary:
    'A reading list of 30 books in a short scrolling box. Drag a book toward the top or bottom edge and the box scrolls on its own, so you can carry it to the far end without dropping it first.',
  section: 'AutoScroll',
  tags: ['scroll', 'forceAutoScrollFallback', 'AutoScroll'],
  docs: ['repo/plugins/AutoScroll/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
