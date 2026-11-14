// dexie-js example: InvalidTableError: asking for a table that is not there
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InvalidTableError: asking for a table that is not there",
  summary: "The schema declares one table. db.table('friends') hands it over, while db.table('pets') fails at once with a red InvalidTableError. db.tables lists what really exists.",
  section: "Errors",
  tags: ["InvalidTableError","table","tables"],
  docs: ["repo/docs/DexieErrors/Dexie.InvalidTableError.md","repo/docs/Dexie/Dexie.table().md","repo/docs/Dexie/Dexie.tables.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
