// Sortable.js example: draggable selector keeps section headers out of the dragging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playlist whose section headers stay put',
  summary:
    'A playlist split into Morning, Afternoon and Evening: songs can move anywhere, but the section titles are fixed signposts that do not drag or shuffle.',
  section: 'Dragging rules',
  tags: ['draggable'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
