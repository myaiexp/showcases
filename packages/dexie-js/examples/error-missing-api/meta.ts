// dexie-js example: MissingAPIError: no IndexedDB to open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MissingAPIError: no IndexedDB to open",
  summary: "One database gets a real IndexedDB, another is handed a stand-in that cannot open anything, like a browser or Node without IndexedDB. The second fails to open with a red MissingAPIError and refuses every later call.",
  section: "Errors",
  tags: ["MissingAPIError","indexedDB option"],
  docs: ["repo/docs/DexieErrors/Dexie.MissingAPIError.md","repo/docs/DexieErrors/Dexie.DatabaseClosedError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
