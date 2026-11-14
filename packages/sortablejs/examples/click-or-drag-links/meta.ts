// Sortable.js example: a bookmarks bar where clicks open and drags reorder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click opens, drag reorders',
  summary:
    'A list of links that are also draggable. A small dead zone means a slightly shaky click still opens the site, while a deliberate drag reorders. Slide the zone to 0 to feel the difference.',
  section: 'Fallback mode',
  tags: ['fallbackTolerance', 'forceFallback', 'onEnd'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
