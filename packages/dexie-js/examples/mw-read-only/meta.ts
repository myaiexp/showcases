// dexie-js example: Middleware that turns the database read-only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Middleware that turns the database read-only",
  summary: "With one flag switched on, the middleware rejects every write before it reaches IndexedDB. Deleting a friend fails with a red ReadOnlyError and the grid stays the same, while reading carries on normally. It suits a viewer mode or a locked-down screen.",
  section: "Hooks and middleware",
  tags: ["use","DBCore","middleware","ReadOnlyError"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/DBCore/DBCore.md","repo/docs/DBCore/DBCoreMutateRequest.md","repo/docs/DexieErrors/Dexie.ReadOnlyError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
