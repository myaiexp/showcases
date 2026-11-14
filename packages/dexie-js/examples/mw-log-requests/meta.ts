// dexie-js example: Middleware logging every request the database gets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Middleware logging every request the database gets",
  summary: "A spy installed with db.use() sits between Dexie and the database and writes one line per request: mutate, get, query or count. Each table call in the steps shows up as the request kind it really is. It makes the hidden traffic visible.",
  section: "Hooks and middleware",
  tags: ["use","DBCore","middleware","logging"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/DBCore/DBCore.md","repo/docs/DBCore/DBCoreMutateRequest.md","repo/docs/DBCore/DBCoreTable.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
