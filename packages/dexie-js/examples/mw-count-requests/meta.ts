// dexie-js example: Middleware that counts requests by kind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Middleware that counts requests by kind",
  summary: "The middleware does nothing but tally how many get, query and mutate requests pass through. Reading three rows one by one counts three, listing everyone counts one. It is a quick way to see how chatty code is.",
  section: "Hooks and middleware",
  tags: ["use","DBCore","middleware","counting"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/DBCore/DBCore.md","repo/docs/DBCore/DBCoreTable.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
