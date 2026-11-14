// dexie-js example: Take tags away with remove()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Take tags away with remove()',
  summary:
    'Handing remove() a list takes those items out of a stored list, right in the database. Items that are not there are ignored, and a property that is not a list at all ends up as an empty list.',
  section: 'Prop modifications',
  tags: ['remove()', 'update()', 'arrays'],
  docs: ['repo/docs/PropModification/remove().md', 'repo/docs/Table/Table.update().md', 'repo/docs/Table/Table.bulkPut().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
