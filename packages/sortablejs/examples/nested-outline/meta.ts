// Sortable.js example: a draggable folder tree with sortable lists inside lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested outline',
  summary:
    'A project file tree where every folder is its own sortable list inside another. Move files between folders, move whole folders, or drop into an empty one.',
  section: 'Nesting and empty lists',
  tags: ['group', 'dragoverBubble', 'nested', 'swapThreshold'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
