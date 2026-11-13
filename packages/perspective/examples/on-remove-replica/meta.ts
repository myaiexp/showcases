// Perspective example: replicating a filtered View via callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Remove callbacks and a replica',
  summary:
    'A second Table is kept equal to a filtered View using only its callbacks: on_update in row mode hands over the changed rows as Arrow, on_remove reports keys that left with the cause "key" or "filter", and a reset after clear() or replace() calls for replace().',
  section: 'Advanced View',
  tags: ['on_remove', 'on_update', 'replica', 'Arrow', 'filter', 'remove_remove', 'reset'],
  docs: ['repo/docs/md/explanation/view/advanced.md', 'repo/docs/md/explanation/table/options.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
