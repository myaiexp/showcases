// dexie-js example: Compound index: all Angelas, sorted by last name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound index: all Angelas, sorted by last name',
  summary:
    'Pairing the first name with the lowest and highest possible keys selects everyone with that first name, and the answer comes back ordered by last name for free, even though the table lists them in another order.',
  section: 'WhereClause',
  tags: ['version().stores', '[firstName+lastName]', 'where', 'between', 'Dexie.minKey', 'Dexie.maxKey', 'toArray'],
  docs: ['repo/docs/Compound-Index.md', 'repo/docs/WhereClause/WhereClause.between().md', 'repo/docs/Indexable-Type.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
