// Sortable.js example: a file list that needs a held key to add to the selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hold Ctrl to pick several files',
  summary:
    'A file list where a plain click picks one file, like a desktop file manager, and holding a key while clicking adds more. Switch the key from Ctrl to Alt or Shift to feel the option change.',
  section: 'MultiDrag',
  tags: ['multiDrag', 'multiDragKey', 'selectedClass', 'option()'],
  docs: ['repo/plugins/MultiDrag/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
