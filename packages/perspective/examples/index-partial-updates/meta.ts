// Perspective example: index, in-place and partial updates, remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Index and partial updates',
  summary:
    'With index: "id" a Table treats id as the primary key: update() replaces the row of a matching id, may omit columns, and remove() deletes by key. Use the buttons, or watch a stream of quotes update twelve rows in place.',
  section: 'Table',
  tags: ['index', 'update', 'remove', 'partial update', 'get_index', 'streaming'],
  docs: [
    'repo/docs/md/explanation/table/options.md',
    'repo/docs/md/explanation/table/update_and_remove.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
