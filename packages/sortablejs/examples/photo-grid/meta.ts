// Sortable.js example: a drag-to-rearrange photo grid made of plain divs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo grid',
  summary:
    'Rearrange an album by dragging photos around a wrapping grid. Nothing here is a list: it is plain divs, and Sortable works out on its own that the tiles flow sideways.',
  section: 'Swap zones and direction',
  tags: ['direction', 'detectDirection', 'Sortable.create'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
