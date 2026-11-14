// dexie-js example: collection.raw(): skip the reading hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.raw(): skip the reading hook",
  summary:
    "A reading hook can change every row on its way out of the database. Here one adds a friendly label. Reading normally gives you the labelled rows, while raw() hands back exactly what is stored, with no label. The grid always shows the stored data.",
  section: 'Collection',
  tags: ['raw', "hook('reading')", 'orderBy', 'limit'],
  docs: ['repo/docs/Collection/Collection.raw().md', "repo/docs/Table/Table.hook('reading').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
