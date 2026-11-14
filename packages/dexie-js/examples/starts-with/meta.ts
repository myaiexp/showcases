// dexie-js example: StartsWith: names beginning with a prefix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StartsWith: names beginning with a prefix',
  summary:
    'Type the first letters of a name and the matching names light up. The match is case sensitive: "Sa" finds Sam and Sara but "sa" finds only sara.',
  section: 'WhereClause',
  tags: ['where', 'startsWith', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.startsWith().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
