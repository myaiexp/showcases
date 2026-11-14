// dexie-js example: close() that reopens on next use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "close() that reopens on next use",
  summary: "With close({ disableAutoOpen: false }) the connection is released, but the database opens itself again the moment something asks for data. It is the polite way to let go of a connection you might need again.",
  section: 'Dexie class',
  tags: ["close()","disableAutoOpen","autoOpen","isOpen"],
  docs: ["repo/docs/Dexie/Dexie.close().md","repo/docs/Dexie/Dexie.open().md","repo/docs/Dexie/Dexie.isOpen().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
