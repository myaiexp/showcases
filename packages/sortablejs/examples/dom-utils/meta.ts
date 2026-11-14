// Sortable.js example: Sortable's own DOM helpers running a packing checklist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DOM helpers',
  summary:
    'A packing checklist where you tick items off, drag them around and duplicate one. All the page code uses the small helpers Sortable ships for itself: listening, finding the row, toggling a class, counting and copying.',
  section: 'Static API',
  tags: ['Sortable.utils', 'on', 'off', 'css', 'toggleClass', 'is', 'closest', 'index', 'find', 'clone'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
