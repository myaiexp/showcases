// dexie-js example: close(), then use it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "close(), then use it",
  summary: "db.close() shuts the connection and leaves it shut: the next call fails with DatabaseClosedError instead of quietly reopening. Only an explicit open() brings the database back, and the rows were never lost.",
  section: 'Dexie class',
  tags: ["close()","open()","isOpen","DatabaseClosedError"],
  docs: ["repo/docs/Dexie/Dexie.close().md","repo/docs/Dexie/Dexie.open().md","repo/docs/Dexie/Dexie.isOpen().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
