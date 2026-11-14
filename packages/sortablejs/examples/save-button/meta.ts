// Sortable.js example: a layout that only sticks once Save is pressed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Save button',
  summary:
    'Rearrange dashboard widgets and an "Unsaved changes" marker appears. Nothing is kept until you press Save, and Discard returns to the last saved layout, the way a settings screen behaves.',
  section: 'Methods',
  tags: ['store', 'save()', 'toArray()', 'sort()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
