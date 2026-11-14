// dexie-js example: add() never loses a count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'add() never loses a count',
  summary:
    'Ten likes arrive at the same moment. Counted the usual way, by reading the number and writing back one more, every like reads the same old count and most of them vanish. Counted with add(1), the addition happens inside the database and all ten are kept.',
  section: 'Prop modifications',
  tags: ['add()', 'update()', 'get()', 'put()', 'consistency'],
  docs: [
    'repo/docs/Table/Table.bulkPut().md',
    'repo/docs/PropModification/add().md',
    'repo/docs/Table/Table.update().md',
    'repo/docs/Table/Table.get().md',
    'repo/docs/Table/Table.put().md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
