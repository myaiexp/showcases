// dexie-js example: Search as you type with startsWithIgnoreCase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search as you type with startsWithIgnoreCase',
  summary:
    'A search box that asks the database on every keystroke. The list narrows to names starting with what you typed, whatever the casing, which is the classic use of startsWithIgnoreCase.',
  section: 'WhereClause',
  tags: ['where', 'startsWithIgnoreCase', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.startsWithIgnoreCase().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
