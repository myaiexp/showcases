// dexie-js example: Multi-entry index: anyOf can repeat a friend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multi-entry index: anyOf can repeat a friend',
  summary:
    'Looking up two tags at once returns a friend once per matching tag, so someone with both appears twice in the answer. The docs advise adding distinct() to the query to avoid that.',
  section: 'WhereClause',
  tags: ['version().stores', '*tags', 'where', 'anyOf', 'toArray'],
  docs: ['repo/docs/MultiEntry-Index.md', 'repo/docs/WhereClause/WhereClause.anyOf().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
