// dexie-js example: A caught error becomes a result
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A caught error becomes a result",
  summary: "What a catch handler returns becomes the result of the whole chain. Here, adding a friend that already exists falls back to fetching the existing one, so the caller always gets a row.",
  section: 'Promise',
  tags: ["catch", "Dexie.ConstraintError", "add", "get"],
  docs: ["repo/docs/Promise/Promise.catch().md", "repo/docs/DexieErrors/Dexie.ConstraintError.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Table/Table.add().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
