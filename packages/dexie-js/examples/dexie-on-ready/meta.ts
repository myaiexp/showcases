// dexie-js example: on('ready'): once, or every time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('ready'): once, or every time",
  summary: "A ready subscriber runs when the database has finished opening. A normal one fires only once in the life of the instance; one marked sticky fires again after every close and reopen; and subscribing to an already open database runs at once.",
  section: 'Dexie class',
  tags: ["on('ready')","bSticky","close()","open()"],
  docs: ["repo/docs/Dexie/Dexie.on.ready.md","repo/docs/Dexie/Dexie.on().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
