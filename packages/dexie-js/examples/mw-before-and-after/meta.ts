// dexie-js example: Middleware sees a write before and after it happens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Middleware sees a write before and after it happens",
  summary: "The middleware logs a line before forwarding each write and another when the answer comes back with the number of failures. A clean add shows zero failures; an add that clashes shows one. Acting on both sides is what hooks cannot do as neatly.",
  section: "Hooks and middleware",
  tags: ["use","DBCore","middleware","mutate"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/DBCore/DBCore.md","repo/docs/DBCore/DBCoreMutateRequest.md","repo/docs/DBCore/DBCoreMutateResponse.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
