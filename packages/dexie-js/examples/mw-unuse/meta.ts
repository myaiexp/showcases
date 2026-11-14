// dexie-js example: Removing a middleware with unuse()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Removing a middleware with unuse()",
  summary: "A spy is installed by name, then removed with unuse(). The surprise, seen by running it (unuse() is in Dexie's type definitions, not its docs), is that the open database keeps spying until it is closed and opened again. Reopening drops it, and calling use() before another reopen brings it back.",
  section: "Hooks and middleware",
  tags: ["use","unuse","middleware","close","open"],
  docs: ["repo/docs/Dexie/Dexie.use().md","repo/docs/Dexie/Dexie.close().md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
