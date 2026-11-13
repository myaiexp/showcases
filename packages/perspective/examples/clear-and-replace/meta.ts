// Perspective example: table.clear() and table.replace() on a live Table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clear and replace',
  summary:
    'clear() removes every row but keeps the schema and the viewer bound to the Table; replace() clears it and loads a new dataset in one step. update() on an unindexed Table appends, for contrast.',
  section: 'Table',
  tags: ['clear', 'replace', 'update', 'size'],
  docs: [
    'repo/docs/md/explanation/table/clear_and_replace.md',
    'repo/docs/md/explanation/table/update_and_remove.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
