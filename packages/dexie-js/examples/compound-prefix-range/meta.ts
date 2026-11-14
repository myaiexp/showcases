// dexie-js example: Compound index: Anna, last name starting with L
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound index: Anna, last name starting with L',
  summary:
    'A range on a compound index can fix the first name and cover a span of last names, here everything from "L" up to "L" plus the highest character. It finds Larsson, Lindgren and Lund but no other Anna.',
  section: 'WhereClause',
  tags: ['version().stores', '[firstName+lastName]', 'where', 'between', 'toArray'],
  docs: ['repo/docs/Compound-Index.md', 'repo/docs/WhereClause/WhereClause.between().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
