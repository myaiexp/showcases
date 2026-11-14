// dexie-js example: One switch turns many errors into friendly messages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One switch turns many errors into friendly messages",
  summary: "Four different things go wrong: a duplicate id, a bad id, an unindexed search and a missing table. One switch on error.name, using Dexie.errnames, turns each into a plain sentence in the event log. It is the usual way to handle Dexie errors in one place.",
  section: "Errors",
  tags: ["errnames","DexieError","switch"],
  docs: ["repo/docs/DexieErrors/DexieError.md","repo/docs/DexieErrors/Dexie.ConstraintError.md","repo/docs/DexieErrors/Dexie.DataError.md","repo/docs/DexieErrors/Dexie.SchemaError.md","repo/docs/DexieErrors/Dexie.InvalidTableError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
