// dexie-js example: collection.modify() errors: ModifyError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify() errors: ModifyError",
  summary:
    "If some rows cannot be changed, for example because two rows would end up with the same value in a unique index, modify() fails with a ModifyError. Catch it and you learn how many rows succeeded, how many failed and which keys, while the successful ones stay changed.",
  section: 'Collection',
  tags: ['modify', 'ModifyError', 'unique index', 'catch'],
  docs: ['repo/docs/Table/Table.toCollection().md', 'repo/docs/Collection/Collection.modify().md', 'repo/docs/DexieErrors/Dexie.ModifyError.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
