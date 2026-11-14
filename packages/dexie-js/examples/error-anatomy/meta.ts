// dexie-js example: What is inside a Dexie error
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "What is inside a Dexie error",
  summary: "A failed add produces an error object. The steps pull it apart: its name, its message, the inner cause, and whether it belongs to the Dexie error family. Knowing these parts is what lets code react to the right failure.",
  section: "Errors",
  tags: ["DexieError","name","message","inner"],
  docs: ["repo/docs/DexieErrors/Dexie.ConstraintError.md","repo/docs/DexieErrors/DexieError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
