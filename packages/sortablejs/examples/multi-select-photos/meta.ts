// Sortable.js example: pick several photos and drag them as one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Move several photos at once',
  summary:
    'A photo album where a tap picks a photo. Pick a few, drag any one of them, and the whole group travels together and unfolds side by side where you let go.',
  section: 'MultiDrag',
  tags: ['multiDrag', 'selectedClass', 'onSelect', 'onDeselect', 'Sortable.mount'],
  docs: ['repo/plugins/MultiDrag/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
