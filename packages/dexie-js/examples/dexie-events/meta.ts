// dexie-js example: Dexie.Events(): your own named events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.Events(): your own named events",
  summary: "Dexie.Events() gives any object a set of named events, the same machinery Dexie uses for its own. A toy car announces move, stop and crash, and everyone who subscribed hears it; several listeners can share one event.",
  section: 'Dexie class',
  tags: ["Dexie.Events","subscribe","fire","custom events"],
  docs: ["repo/docs/Dexie/Dexie.events().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
