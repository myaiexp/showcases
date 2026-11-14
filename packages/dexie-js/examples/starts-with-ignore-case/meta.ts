// dexie-js example: StartsWithIgnoreCase: a prefix in any casing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StartsWithIgnoreCase: a prefix in any casing',
  summary:
    'The same prefix search, but capital letters are ignored, so "sa" finds Sam, Sara and sara. The friendly choice for anything a person types.',
  section: 'WhereClause',
  tags: ['where', 'startsWithIgnoreCase', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.startsWithIgnoreCase().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
