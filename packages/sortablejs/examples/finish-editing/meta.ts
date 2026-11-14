// Sortable.js example: freezing an itinerary with Done, editing again with Edit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Finish editing',
  summary:
    'A trip itinerary you can rearrange in edit mode. Press Done and drag-and-drop is removed completely, leaving a plain list; press Edit and it is switched back on.',
  section: 'Methods',
  tags: ['destroy()', 'Sortable.create', 'edit mode'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
