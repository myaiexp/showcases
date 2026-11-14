// Sortable.js example: dragging a tag out of its box deletes it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag a tag out to delete it',
  summary:
    'A box of interest tags. Pull a tag out of the box and let go to delete it, no trash can needed. Undo brings the last one back and Restock refills the box.',
  section: 'OnSpill',
  tags: ['removeOnSpill', 'onSpill', 'animation'],
  docs: ['repo/plugins/OnSpill/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
