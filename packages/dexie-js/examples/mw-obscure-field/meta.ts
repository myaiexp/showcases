// dexie-js example: Middleware that scrambles a field on its way in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Middleware that scrambles a field on its way in",
  summary: "A note is encoded as it is written and decoded as it is read. The grid shows what is really stored, scrambled, while get() and toArray() return the readable text. It is obscuring, not real encryption, but the same shape works for encryption.",
  section: "Hooks and middleware",
  tags: ["use","DBCore","middleware","encode"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/DBCore/DBCore.md","repo/docs/DBCore/DBCoreMutateRequest.md","repo/docs/DBCore/DBCoreQueryRequest.md","repo/docs/DBCore/DBCoreQueryResponse.md","repo/docs/DBCore/DBCoreGetRequest.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
