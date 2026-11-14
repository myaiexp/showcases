// dexie-js example: on('versionchange'): another tab upgraded the app
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('versionchange'): another tab upgraded the app",
  summary: "Two browser tabs share one database. When Tab 2 ships a newer schema, Tab 1 is told with a versionchange event and, by default, closes its connection so the upgrade can go ahead. Tab 1 then has to reload to speak the new version.",
  section: 'Dexie class',
  tags: ["on('versionchange')","version()","close()","open()"],
  docs: ["repo/docs/Dexie/Dexie.on.versionchange.md","repo/docs/Dexie/Dexie.on().md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
