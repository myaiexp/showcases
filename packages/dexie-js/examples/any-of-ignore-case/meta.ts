// dexie-js example: AnyOfIgnoreCase: a list of names, any casing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnyOfIgnoreCase: a list of names, any casing',
  summary:
    'Like anyOf, but capital letters do not matter, so "DAVID, sara" finds David, david, DAVID and Sara. Type a comma-separated list and see the matches update.',
  section: 'WhereClause',
  tags: ['where', 'anyOfIgnoreCase', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.anyOfIgnoreCase().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
