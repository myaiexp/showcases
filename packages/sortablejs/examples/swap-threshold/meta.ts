// Sortable.js example: a playlist with each row's swap zone drawn over it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swap threshold',
  summary:
    'Drag a song over another and see how far you must push before they trade places. The shaded band on each row is its swap zone, and a slider makes it thinner or wider.',
  section: 'Swap zones and direction',
  tags: ['swapThreshold', 'option()', 'animation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
