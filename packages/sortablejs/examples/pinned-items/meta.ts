// Sortable.js example: pinned chat threads that nothing can pass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinned items',
  summary:
    'A chat list where pinned conversations stay on top. Drag any other thread upward and it stops right under the pins: the app vetoes every move that would pass or displace a pinned row.',
  section: 'Events',
  tags: ['onMove', 'return false', 'related', 'filter'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
