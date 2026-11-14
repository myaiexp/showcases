// dexie-js example: Dexie.vip(): getting past the closed door
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.vip(): getting past the closed door",
  summary: "While a ready job runs, the rest of the app is held back, including the job itself if it reaches the database from a timer. Without vip() that deadlocks until the example gives up; wrapping the call in Dexie.vip() lets it through.",
  section: 'Dexie class',
  tags: ["Dexie.vip","on('ready')","deadlock","close()"],
  docs: ["repo/docs/Dexie/Dexie.vip().md","repo/docs/Dexie/Dexie.on.ready.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
