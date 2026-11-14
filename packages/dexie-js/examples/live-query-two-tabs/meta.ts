// dexie-js example: Another tab's change shows here
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Another tab's change shows here",
  summary:
    'The same to-do list is open twice, as if in two browser tabs, each with its own connection and its own live query. A to-do added or ticked in one appears in the other straight away, because Dexie tells every other connection to the database what changed.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'multiple tabs', 'where().equals', 'Collection.delete()'],
  docs: ['repo/docs/liveQuery().md', 'repo/docs/Table/Table.update().md', 'repo/docs/Collection/Collection.delete().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
