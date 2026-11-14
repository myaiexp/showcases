// Sortable.js example: finding "the third dish" in a menu full of headings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The Nth draggable item',
  summary:
    'A menu with section headings between the dishes. Ask for "the 3rd dish" and Sortable skips the headings when counting, so it names the right dish even after you have rearranged everything.',
  section: 'Static API',
  tags: ['Sortable.utils.getChild', 'Sortable.utils.index', 'draggable'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
