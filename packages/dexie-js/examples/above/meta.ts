// dexie-js example: Above: friends older than a limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Above: friends older than a limit',
  summary:
    'The grid holds six friends with their ages. Type a limit and every friend strictly older than it lights up, with the answer listed beside the grid. The limit itself never counts: 21 finds Arnold, Sara and Per but not Josephine.',
  section: 'WhereClause',
  tags: ['where', 'above', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.above().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
