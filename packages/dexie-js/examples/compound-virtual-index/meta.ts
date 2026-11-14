// dexie-js example: Compound index: its first half works as an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound index: its first half works as an index',
  summary:
    'Only the pair [firstName+lastName] is declared, yet querying firstName alone works. Querying lastName alone is refused, because only the leading part of a compound index can stand alone.',
  section: 'WhereClause',
  tags: ['version().stores', '[firstName+lastName]', 'where', 'equals', 'toArray'],
  docs: ['repo/docs/Compound-Index.md', 'repo/docs/WhereClause/WhereClause.equals().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
