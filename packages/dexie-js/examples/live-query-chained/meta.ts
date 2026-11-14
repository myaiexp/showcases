// dexie-js example: One live query reading two tables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One live query reading two tables',
  summary:
    'The list shows friends at least as old as a stored setting. Its query first reads the setting, then searches friends with it, and Dexie watches both steps: changing the setting or a friend\'s age redraws the list, with no extra wiring.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'get()', 'where().aboveOrEqual', 'two tables'],
  docs: ['repo/docs/liveQuery().md', 'repo/docs/Table/Table.get().md', 'repo/docs/WhereClause/WhereClause.aboveOrEqual().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
