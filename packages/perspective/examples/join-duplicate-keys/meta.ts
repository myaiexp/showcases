// Perspective example: duplicate keys, read-only joins and join constraints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Duplicate keys and constraints',
  summary:
    'Joins multiply rows like SQL: with unindexed sources, two left rows and three right rows sharing a key give six. Index the sources and each key stays single. Buttons also trigger the documented errors: writing to a join, and a shared column name.',
  section: 'Join',
  tags: ['join', 'duplicate keys', 'cross product', 'index', 'read-only', 'delete'],
  docs: [
    'repo/docs/md/explanation/join/reactivity.md',
    'repo/docs/md/explanation/join.md',
    'repo/docs/md/how_to/javascript/join.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
