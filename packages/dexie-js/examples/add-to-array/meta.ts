// dexie-js example: Add tags without duplicates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add tags without duplicates',
  summary:
    'Handing add() a list of tags merges them into a stored list: new tags join, tags already there are not repeated, and the result is kept in alphabetical order. A thing with no tags at all gets a fresh list.',
  section: 'Prop modifications',
  tags: ['add()', 'update()', 'arrays'],
  docs: ['repo/docs/PropModification/add().md', 'repo/docs/Table/Table.update().md', 'repo/docs/Table/Table.bulkPut().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
