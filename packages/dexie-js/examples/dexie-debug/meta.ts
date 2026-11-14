// dexie-js example: Dexie.debug: a page-wide switch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.debug: a page-wide switch",
  summary: "Dexie.debug turns on extra diagnostics for the whole page: true for app developers, 'dexie' for Dexie's own developers. Reading and setting it is plain, but the extra detail appears in the browser's developer tools, not here, so this card shows the three values and puts the original back.",
  section: 'Dexie class',
  tags: ["Dexie.debug"],
  docs: ["repo/docs/Dexie/Dexie.debug.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
