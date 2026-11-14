// dexie-js example: StartsWithAnyOfIgnoreCase: foo and bar prefixes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StartsWithAnyOfIgnoreCase: foo and bar prefixes',
  summary:
    'The docs\' own sample: last names starting with "foo" or "bar" in any casing, so Barfly, Foofie, FOOD and barnes are all found. Edit the prefixes to try your own.',
  section: 'WhereClause',
  tags: ['where', 'startsWithAnyOfIgnoreCase', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.startsWithAnyOfIgnoreCase().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
