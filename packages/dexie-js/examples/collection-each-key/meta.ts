// dexie-js example: collection.eachKey(): visit the index values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.eachKey(): visit the index values",
  summary:
    "eachKey() hands your function the key the collection is sorted by instead of the whole row: names when sorting by name, ages when sorting by age. The keys come in order and a key repeats if several rows share it. The rows light up as each key is visited.",
  section: 'Collection',
  tags: ['eachKey', 'orderBy', 'where'],
  docs: ['repo/docs/Collection/Collection.eachKey().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
