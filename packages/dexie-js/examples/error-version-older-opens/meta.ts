// dexie-js example: VersionError no longer happens: older versions open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "VersionError no longer happens: older versions open",
  summary: "A database is installed at version 2, then opened again asking for version 1. Older IndexedDB would throw a VersionError here; current Dexie just opens what is installed and the rows are all there.",
  section: "Errors",
  tags: ["VersionError","version"],
  docs: ["repo/docs/DexieErrors/Dexie.VersionError.md","repo/docs/Dexie/Dexie.version().md","repo/docs/Dexie/Dexie.backendDB().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
